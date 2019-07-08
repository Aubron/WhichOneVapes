import { Prisma } from './generated/prisma-client'
import S3 from 'aws-sdk/clients/s3';
import fetch from 'node-fetch'
import ImageSearchAPIClient from 'azure-cognitiveservices-imagesearch';
import { CognitiveServicesCredentials } from 'ms-rest-azure';
//@ts-ignore
import arrayBufferToBuffer from 'arraybuffer-to-buffer';

module.exports.import = async () => {
    const celebs = await fetch('https://celebritybucks.com/developers/export/JSON')
        .then((res) => res.json())
    const prisma = new Prisma();
    for (let i = 0; i < celebs.CelebrityValues.length; i += 1) {
        let celeb = celebs.CelebrityValues[i];
        console.log(`Processing ${celeb.name}`)
        await prisma.upsertCelebrity({
            where: {
                internalId: celeb.celebId
            },
            create: {
                internalId: celeb.celebId,
                name: celeb.name,
            },
            update: {
                name: celeb.name
            }
        })
    }
    const s3 = new S3();
    const celebsToUpdate = await prisma.celebrities({
        where: {
            image: null
        }
    });
    for (let i = 0; i < celebsToUpdate.length; i+=1 ) {
        let celeb = celebsToUpdate[i];
        let serviceKey = process.env.AZURE_KEY;

        //instantiate the image search client 
        let credentials = new CognitiveServicesCredentials(serviceKey);
        let imageSearchApiClient = new ImageSearchAPIClient(credentials);
        const sendQuery = async () => {
            console.log('Searching for ',celeb.name)
            return await imageSearchApiClient.imagesOperations.search(`${celeb.name}`, {
                imageContent: "Face",
                size: "Large",
                imageType: "Photo",
                aspect:  "Tall"
            });
        };
        const sendSearch = async () => {
            let i = 0;
            await sendQuery().then(async imageResults => {
                console.log(`Total number of images returned: ${imageResults.value.length}`);
                let firstImageResult = imageResults.value[0];
                await fetch(firstImageResult.contentUrl)
                    .then(res => res.arrayBuffer())
                    .then(buffer => {
                        return s3.putObject({
                            Bucket: process.env.S3_BUCKET,
                            Key: celeb.id,
                            Body: arrayBufferToBuffer(buffer),
                            ACL: "public-read"
                        }).promise();
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log('ERROR',err);
                    });
                await prisma.updateCelebrity({
                    where: {
                        id: celeb.id
                    },
                    data: {
                        image: `https://${process.env.S3_BUCKET}.s3.us-east-2.amazonaws.com/${celeb.id}`,
                        imageSource: firstImageResult.contentUrl
                    }
                })
              })
              .catch(err => {
                  console.log(err);
                if (i < 1) {
                    i += 1;
                    sendSearch();
                }
              })
        }
        await sendSearch();
        
    }

}