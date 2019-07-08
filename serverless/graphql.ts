import { ApolloServer, gql } from 'apollo-server-lambda';
import { idArg, queryType, stringArg, intArg, enumType, objectType } from 'nexus'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import * as path from 'path';
import datamodelInfo from './generated/nexus-prisma';
import { prisma } from './generated/prisma-client';
import EloRank from 'elo-rank';

const MAX_MATCHES_PER_DAY = 10

const getMatchIndicies = (length: number) => {
  const indexOne = Math.floor(Math.random() * (length - 1))
  let indexTwo = indexOne
  while (indexTwo === indexOne) {
    indexTwo = Math.floor(Math.random() * (length - 1))
  }
  return [indexOne, indexTwo]
}

// @ts-ignore
const Celebrity = prismaObjectType({
  name: 'Celebrity',
  definition(t) {
    t.prismaFields([
      'id',
      'name'
    ])
  }
})

const Match = prismaObjectType({
  name: "Match",
  definition(t) {
    t.prismaFields([
      'id',
      'celebOne',
      'celebTwo',
    ])
  }
})

const VoteResponse = objectType({
  name: "VoteResponse",
  definition(t) {
    t.int("winner", {
      description: "A 1 if the celebOne won, a 2 if celebTwo won"
    })
  }
})

const CelebritySort = enumType({
  name: "CelebritySort",
  members: ["DESC", "ASC"],
  description: "How to sort the available celebrities"
})

const Query = queryType({
  definition(t) {
    t.list.field('celebrities', {
      type: 'Celebrity',
      description: "List the available celebrities, optionally sorted by ELO",
      args: {
        sort: CelebritySort,
        limit: intArg({
          description: "Limit the number of results returned."
        })
      },
      resolve: (parent, { sort = "DESC", limit }, ctx) => {
        const query: { orderBy: string; first?: number } = {
          orderBy: sort === "DESC" ? "elo_DESC" : "elo_ASC"
        }
        if (limit) {
          query.first = limit
        }
        return ctx.prisma.celebrities(query);
      }
    })
    t.field('match', {
      type: 'Match',
      description: "Request a match!",
      resolve: async (parent, args, ctx) => {
        // check the match table for their IP Address, see if they've over voted today
        let complete = false;
        const ipMatches = await (ctx.prisma.matches({
          where: {
            ip: ctx.event.requestContext.identity.sourceIp
          }
        }));
        if (ipMatches.length > MAX_MATCHES_PER_DAY) {
          //if they've voted too much, we still create matches, we just mark them complete. This makes it somewhat harder to bot.
          complete = true;
        }
        
        const celebs = await ctx.prisma.celebrities();
        const [matchOneIndex, matchTwoIndex] = getMatchIndicies(celebs.length);
        const celebOne = celebs[matchOneIndex];
        const celebTwo = celebs[matchTwoIndex];
        const expected = celebOne.elo >= celebTwo.elo ? 1 : 2
        return ctx.prisma.createMatch({
          ip: ctx.event.requestContext.identity.sourceIp,
          expected,
          complete,
          celebOne: {
            connect: {
              id: celebOne.id
            }
          },
          celebTwo: {
            connect: {
              id: celebTwo.id
            }
          },
        })
      }
    })
  }
})


const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.field('vote',{
      type: 'VoteResponse',
      description: "Submit a vote on an existing match.",
      args: {
        id: idArg({
          description: "The MatchID which is being voted upon",
          required: true
        }),
        vote: intArg({
          description: "1 or 2, which indicates celeb1 or celeb2",
          required: true
        })
      },
      resolve: async (parent, { id, vote }, ctx) => {
        // get and verify the match details
        const match = await ctx.prisma.match({
          id
        }).$fragment(`
        fragment MatchWithCelebs on Match {
          id
          celebOne {
            id
            elo
          }
          celebTwo {
            id
            elo
          }
          ip
          expected
          complete
        }
        `)
        if (!match) {
          // return bogus results if the match wasn't found.
          return {
            winner: Math.floor(Math.random() * 2) + 1
          }
        }

        

        // if the match isn't completed, mark it as completed.
        if (!match.complete) {
          await ctx.prisma.updateMatch({
            where: {
              id
            },
            data: {
              complete: true
            }
          })

          // Update the Celebrity ELOs.
          const elo = new EloRank();
          const expectedScoreOne = elo.getExpected(match.celebOne.elo, match.celebTwo.elo);
          const expectedScoreTwo = elo.getExpected(match.celebTwo.elo, match.celebOne.elo);
          const newEloOne = elo.updateRating(expectedScoreOne, vote === 1 ? 1 : 0, match.celebOne.elo);
          const newEloTwo = elo.updateRating(expectedScoreTwo, vote === 2 ? 1 : 0, match.celebTwo.elo);
          await ctx.prisma.updateCelebrity({
            where: {
              id: match.celebOne.id
            },
            data: {
              elo: newEloOne
            }
          })
          await ctx.prisma.updateCelebrity({
            where: {
              id: match.celebTwo.id
            },
            data: {
              elo: newEloTwo
            }
          })
        }

        // and return the expected winner.
        return {
          winner: match.celebOne.elo >= match.celebTwo.elo ? 1 : 2
        }
      }
    })
    t.field('markUnknown', {
      type: "Boolean",
      description: "Submits feedback the the celebrity wasn't recognized by the user. This is used to pass on a match, and slowly influence available celebrities",
      args: {
        matchId: idArg({
          description: "The MatchID in which the celebrity wasn't known",
          required: true,
        }),
        celebId: idArg({
          description: "The ID of the celebrity who wasn't known",
          required: true,
        })
      },
      resolve: async (parent, { matchId, celebId }, ctx) => {
        const match = await ctx.prisma.match({
          id: matchId
        }).$fragment(`
        fragment MatchWithCelebIDs on Match {
          id
          celebOne {
            id
            unknownCount
          }
          celebTwo {
            id
            unknownCount
          }
          complete
        }
        `)
        // if the match isn't valid, return true
        if (!match || (match.celebOne.id !== celebId && match.celebTwo.id !== celebId) || match.complete) {
          return true;
        }

        let celebUnknownCount = match.celebOne.id === celebId ? match.celebOne.unknownCount : match.celebTwo.unknownCount

        // Otherwise, log that the celebrity was unknown and move on.
        await ctx.prisma.updateCelebrity({
          where: {
            id: celebId
          },
          data: {
            unknownCount: celebUnknownCount + 1
          }
        })
        // and set the match to complete to avoid botting
        await ctx.prisma.updateMatch({
          where: {
            id: matchId
          },
          data: {
            complete: true
          }
        })
      }
    })
  }
})

const schema = makePrismaSchema({
  types: [Query, Mutation, Celebrity, CelebritySort, Match, VoteResponse],
  prisma: {
    datamodelInfo,
    client: prisma,
  },
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  nonNullDefaults: {
    input: false,
    output: false,
  },
  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
})
 
const server = new ApolloServer({
  schema,
  context: ({ event, context }) => ({
    prisma,
    event,
    context
  })
});
 
// With workaround
exports.handler = (event: { httpMethod: string, requestContext: { path?: string }, path?: string }, lambdaContext: object , callback: object) => {
    // Playground handler
    if (event.httpMethod === 'GET') {
      server.createHandler()(
        {...event, path: event.requestContext.path || event.path},
        lambdaContext,
        callback,
      );
    } else {
      server.createHandler()(event, lambdaContext, callback);
    }
};