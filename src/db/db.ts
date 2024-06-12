import {DBType} from "../types/types";
import {ErrorsType} from "../input-output-types/output-errors-type";
import {MongoClient, ServerApiVersion} from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017'

export const db: DBType = {
    blogs: [],
    posts: [],
}

export const errors: ErrorsType = {
    errorsMessages: []
}

const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function runDb() {
    try {
        await client.connect();
        await client.db("posts").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}