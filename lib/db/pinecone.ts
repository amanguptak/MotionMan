import {Pinecone} from "@pinecone-database/pinecone"


const apiKey = process.env.PINE_CONE

if(!apiKey){
throw Error("pinecone key is not defined")
}

const pinecone = new Pinecone({
    environment : "gcp-starter",
    apiKey
})


export const noteIndex = pinecone.Index("motion");