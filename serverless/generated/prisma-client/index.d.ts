// Code generated by Prisma (prisma@1.34.0). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  celebrity: (where?: CelebrityWhereInput) => Promise<boolean>;
  iP: (where?: IPWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  celebrity: (where: CelebrityWhereUniqueInput) => CelebrityNullablePromise;
  celebrities: (args?: {
    where?: CelebrityWhereInput;
    orderBy?: CelebrityOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Celebrity>;
  celebritiesConnection: (args?: {
    where?: CelebrityWhereInput;
    orderBy?: CelebrityOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => CelebrityConnectionPromise;
  iP: (where: IPWhereUniqueInput) => IPNullablePromise;
  iPs: (args?: {
    where?: IPWhereInput;
    orderBy?: IPOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<IP>;
  iPsConnection: (args?: {
    where?: IPWhereInput;
    orderBy?: IPOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => IPConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createCelebrity: (data: CelebrityCreateInput) => CelebrityPromise;
  updateCelebrity: (args: {
    data: CelebrityUpdateInput;
    where: CelebrityWhereUniqueInput;
  }) => CelebrityPromise;
  updateManyCelebrities: (args: {
    data: CelebrityUpdateManyMutationInput;
    where?: CelebrityWhereInput;
  }) => BatchPayloadPromise;
  upsertCelebrity: (args: {
    where: CelebrityWhereUniqueInput;
    create: CelebrityCreateInput;
    update: CelebrityUpdateInput;
  }) => CelebrityPromise;
  deleteCelebrity: (where: CelebrityWhereUniqueInput) => CelebrityPromise;
  deleteManyCelebrities: (where?: CelebrityWhereInput) => BatchPayloadPromise;
  createIP: (data: IPCreateInput) => IPPromise;
  updateIP: (args: {
    data: IPUpdateInput;
    where: IPWhereUniqueInput;
  }) => IPPromise;
  updateManyIPs: (args: {
    data: IPUpdateManyMutationInput;
    where?: IPWhereInput;
  }) => BatchPayloadPromise;
  upsertIP: (args: {
    where: IPWhereUniqueInput;
    create: IPCreateInput;
    update: IPUpdateInput;
  }) => IPPromise;
  deleteIP: (where: IPWhereUniqueInput) => IPPromise;
  deleteManyIPs: (where?: IPWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  celebrity: (
    where?: CelebritySubscriptionWhereInput
  ) => CelebritySubscriptionPayloadSubscription;
  iP: (where?: IPSubscriptionWhereInput) => IPSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type CelebrityOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "internalId_ASC"
  | "internalId_DESC"
  | "name_ASC"
  | "name_DESC"
  | "elo_ASC"
  | "elo_DESC"
  | "disabled_ASC"
  | "disabled_DESC"
  | "totalFights_ASC"
  | "totalFights_DESC"
  | "unknownFights_ASC"
  | "unknownFights_DESC";

export type IPOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "ip_ASC"
  | "ip_DESC"
  | "votes_ASC"
  | "votes_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface IPCreateInput {
  id?: Maybe<ID_Input>;
  ip: String;
  votes?: Maybe<Int>;
}

export type CelebrityWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  internalId?: Maybe<ID_Input>;
}>;

export interface CelebrityUpdateInput {
  internalId?: Maybe<ID_Input>;
  name?: Maybe<String>;
  elo?: Maybe<Int>;
  disabled?: Maybe<Boolean>;
  totalFights?: Maybe<Int>;
  unknownFights?: Maybe<Int>;
}

export interface CelebrityWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  internalId?: Maybe<ID_Input>;
  internalId_not?: Maybe<ID_Input>;
  internalId_in?: Maybe<ID_Input[] | ID_Input>;
  internalId_not_in?: Maybe<ID_Input[] | ID_Input>;
  internalId_lt?: Maybe<ID_Input>;
  internalId_lte?: Maybe<ID_Input>;
  internalId_gt?: Maybe<ID_Input>;
  internalId_gte?: Maybe<ID_Input>;
  internalId_contains?: Maybe<ID_Input>;
  internalId_not_contains?: Maybe<ID_Input>;
  internalId_starts_with?: Maybe<ID_Input>;
  internalId_not_starts_with?: Maybe<ID_Input>;
  internalId_ends_with?: Maybe<ID_Input>;
  internalId_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  elo?: Maybe<Int>;
  elo_not?: Maybe<Int>;
  elo_in?: Maybe<Int[] | Int>;
  elo_not_in?: Maybe<Int[] | Int>;
  elo_lt?: Maybe<Int>;
  elo_lte?: Maybe<Int>;
  elo_gt?: Maybe<Int>;
  elo_gte?: Maybe<Int>;
  disabled?: Maybe<Boolean>;
  disabled_not?: Maybe<Boolean>;
  totalFights?: Maybe<Int>;
  totalFights_not?: Maybe<Int>;
  totalFights_in?: Maybe<Int[] | Int>;
  totalFights_not_in?: Maybe<Int[] | Int>;
  totalFights_lt?: Maybe<Int>;
  totalFights_lte?: Maybe<Int>;
  totalFights_gt?: Maybe<Int>;
  totalFights_gte?: Maybe<Int>;
  unknownFights?: Maybe<Int>;
  unknownFights_not?: Maybe<Int>;
  unknownFights_in?: Maybe<Int[] | Int>;
  unknownFights_not_in?: Maybe<Int[] | Int>;
  unknownFights_lt?: Maybe<Int>;
  unknownFights_lte?: Maybe<Int>;
  unknownFights_gt?: Maybe<Int>;
  unknownFights_gte?: Maybe<Int>;
  AND?: Maybe<CelebrityWhereInput[] | CelebrityWhereInput>;
  OR?: Maybe<CelebrityWhereInput[] | CelebrityWhereInput>;
  NOT?: Maybe<CelebrityWhereInput[] | CelebrityWhereInput>;
}

export interface CelebritySubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<CelebrityWhereInput>;
  AND?: Maybe<
    CelebritySubscriptionWhereInput[] | CelebritySubscriptionWhereInput
  >;
  OR?: Maybe<
    CelebritySubscriptionWhereInput[] | CelebritySubscriptionWhereInput
  >;
  NOT?: Maybe<
    CelebritySubscriptionWhereInput[] | CelebritySubscriptionWhereInput
  >;
}

export interface IPWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  ip?: Maybe<String>;
  ip_not?: Maybe<String>;
  ip_in?: Maybe<String[] | String>;
  ip_not_in?: Maybe<String[] | String>;
  ip_lt?: Maybe<String>;
  ip_lte?: Maybe<String>;
  ip_gt?: Maybe<String>;
  ip_gte?: Maybe<String>;
  ip_contains?: Maybe<String>;
  ip_not_contains?: Maybe<String>;
  ip_starts_with?: Maybe<String>;
  ip_not_starts_with?: Maybe<String>;
  ip_ends_with?: Maybe<String>;
  ip_not_ends_with?: Maybe<String>;
  votes?: Maybe<Int>;
  votes_not?: Maybe<Int>;
  votes_in?: Maybe<Int[] | Int>;
  votes_not_in?: Maybe<Int[] | Int>;
  votes_lt?: Maybe<Int>;
  votes_lte?: Maybe<Int>;
  votes_gt?: Maybe<Int>;
  votes_gte?: Maybe<Int>;
  AND?: Maybe<IPWhereInput[] | IPWhereInput>;
  OR?: Maybe<IPWhereInput[] | IPWhereInput>;
  NOT?: Maybe<IPWhereInput[] | IPWhereInput>;
}

export interface CelebrityCreateInput {
  id?: Maybe<ID_Input>;
  internalId: ID_Input;
  name: String;
  elo?: Maybe<Int>;
  disabled?: Maybe<Boolean>;
  totalFights?: Maybe<Int>;
  unknownFights?: Maybe<Int>;
}

export type IPWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  ip?: Maybe<String>;
}>;

export interface IPUpdateManyMutationInput {
  ip?: Maybe<String>;
  votes?: Maybe<Int>;
}

export interface CelebrityUpdateManyMutationInput {
  internalId?: Maybe<ID_Input>;
  name?: Maybe<String>;
  elo?: Maybe<Int>;
  disabled?: Maybe<Boolean>;
  totalFights?: Maybe<Int>;
  unknownFights?: Maybe<Int>;
}

export interface IPSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<IPWhereInput>;
  AND?: Maybe<IPSubscriptionWhereInput[] | IPSubscriptionWhereInput>;
  OR?: Maybe<IPSubscriptionWhereInput[] | IPSubscriptionWhereInput>;
  NOT?: Maybe<IPSubscriptionWhereInput[] | IPSubscriptionWhereInput>;
}

export interface IPUpdateInput {
  ip?: Maybe<String>;
  votes?: Maybe<Int>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface IPEdge {
  node: IP;
  cursor: String;
}

export interface IPEdgePromise extends Promise<IPEdge>, Fragmentable {
  node: <T = IPPromise>() => T;
  cursor: () => Promise<String>;
}

export interface IPEdgeSubscription
  extends Promise<AsyncIterator<IPEdge>>,
    Fragmentable {
  node: <T = IPSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface CelebrityConnection {
  pageInfo: PageInfo;
  edges: CelebrityEdge[];
}

export interface CelebrityConnectionPromise
  extends Promise<CelebrityConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<CelebrityEdge>>() => T;
  aggregate: <T = AggregateCelebrityPromise>() => T;
}

export interface CelebrityConnectionSubscription
  extends Promise<AsyncIterator<CelebrityConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<CelebrityEdgeSubscription>>>() => T;
  aggregate: <T = AggregateCelebritySubscription>() => T;
}

export interface IPPreviousValues {
  id: ID_Output;
  ip: String;
  votes: Int;
}

export interface IPPreviousValuesPromise
  extends Promise<IPPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  ip: () => Promise<String>;
  votes: () => Promise<Int>;
}

export interface IPPreviousValuesSubscription
  extends Promise<AsyncIterator<IPPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  ip: () => Promise<AsyncIterator<String>>;
  votes: () => Promise<AsyncIterator<Int>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface CelebritySubscriptionPayload {
  mutation: MutationType;
  node: Celebrity;
  updatedFields: String[];
  previousValues: CelebrityPreviousValues;
}

export interface CelebritySubscriptionPayloadPromise
  extends Promise<CelebritySubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = CelebrityPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = CelebrityPreviousValuesPromise>() => T;
}

export interface CelebritySubscriptionPayloadSubscription
  extends Promise<AsyncIterator<CelebritySubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = CelebritySubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = CelebrityPreviousValuesSubscription>() => T;
}

export interface IPConnection {
  pageInfo: PageInfo;
  edges: IPEdge[];
}

export interface IPConnectionPromise
  extends Promise<IPConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<IPEdge>>() => T;
  aggregate: <T = AggregateIPPromise>() => T;
}

export interface IPConnectionSubscription
  extends Promise<AsyncIterator<IPConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<IPEdgeSubscription>>>() => T;
  aggregate: <T = AggregateIPSubscription>() => T;
}

export interface CelebrityPreviousValues {
  id: ID_Output;
  internalId: ID_Output;
  name: String;
  elo: Int;
  disabled: Boolean;
  totalFights: Int;
  unknownFights: Int;
}

export interface CelebrityPreviousValuesPromise
  extends Promise<CelebrityPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  internalId: () => Promise<ID_Output>;
  name: () => Promise<String>;
  elo: () => Promise<Int>;
  disabled: () => Promise<Boolean>;
  totalFights: () => Promise<Int>;
  unknownFights: () => Promise<Int>;
}

export interface CelebrityPreviousValuesSubscription
  extends Promise<AsyncIterator<CelebrityPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  internalId: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  elo: () => Promise<AsyncIterator<Int>>;
  disabled: () => Promise<AsyncIterator<Boolean>>;
  totalFights: () => Promise<AsyncIterator<Int>>;
  unknownFights: () => Promise<AsyncIterator<Int>>;
}

export interface Celebrity {
  id: ID_Output;
  internalId: ID_Output;
  name: String;
  elo: Int;
  disabled: Boolean;
  totalFights: Int;
  unknownFights: Int;
}

export interface CelebrityPromise extends Promise<Celebrity>, Fragmentable {
  id: () => Promise<ID_Output>;
  internalId: () => Promise<ID_Output>;
  name: () => Promise<String>;
  elo: () => Promise<Int>;
  disabled: () => Promise<Boolean>;
  totalFights: () => Promise<Int>;
  unknownFights: () => Promise<Int>;
}

export interface CelebritySubscription
  extends Promise<AsyncIterator<Celebrity>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  internalId: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  elo: () => Promise<AsyncIterator<Int>>;
  disabled: () => Promise<AsyncIterator<Boolean>>;
  totalFights: () => Promise<AsyncIterator<Int>>;
  unknownFights: () => Promise<AsyncIterator<Int>>;
}

export interface CelebrityNullablePromise
  extends Promise<Celebrity | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  internalId: () => Promise<ID_Output>;
  name: () => Promise<String>;
  elo: () => Promise<Int>;
  disabled: () => Promise<Boolean>;
  totalFights: () => Promise<Int>;
  unknownFights: () => Promise<Int>;
}

export interface IP {
  id: ID_Output;
  ip: String;
  votes: Int;
}

export interface IPPromise extends Promise<IP>, Fragmentable {
  id: () => Promise<ID_Output>;
  ip: () => Promise<String>;
  votes: () => Promise<Int>;
}

export interface IPSubscription
  extends Promise<AsyncIterator<IP>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  ip: () => Promise<AsyncIterator<String>>;
  votes: () => Promise<AsyncIterator<Int>>;
}

export interface IPNullablePromise extends Promise<IP | null>, Fragmentable {
  id: () => Promise<ID_Output>;
  ip: () => Promise<String>;
  votes: () => Promise<Int>;
}

export interface AggregateIP {
  count: Int;
}

export interface AggregateIPPromise extends Promise<AggregateIP>, Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateIPSubscription
  extends Promise<AsyncIterator<AggregateIP>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface AggregateCelebrity {
  count: Int;
}

export interface AggregateCelebrityPromise
  extends Promise<AggregateCelebrity>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateCelebritySubscription
  extends Promise<AsyncIterator<AggregateCelebrity>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface IPSubscriptionPayload {
  mutation: MutationType;
  node: IP;
  updatedFields: String[];
  previousValues: IPPreviousValues;
}

export interface IPSubscriptionPayloadPromise
  extends Promise<IPSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = IPPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = IPPreviousValuesPromise>() => T;
}

export interface IPSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<IPSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = IPSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = IPPreviousValuesSubscription>() => T;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface CelebrityEdge {
  node: Celebrity;
  cursor: String;
}

export interface CelebrityEdgePromise
  extends Promise<CelebrityEdge>,
    Fragmentable {
  node: <T = CelebrityPromise>() => T;
  cursor: () => Promise<String>;
}

export interface CelebrityEdgeSubscription
  extends Promise<AsyncIterator<CelebrityEdge>>,
    Fragmentable {
  node: <T = CelebritySubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

export type Long = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Celebrity",
    embedded: false
  },
  {
    name: "IP",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
