import {Db, MongoClient} from "mongodb";
import dotenv from 'dotenv'
import {BlogDbType, PostDbType} from "../models/db/db.models";
import {SETTINGS} from "../settings";

dotenv.config()

export const mongoURI = process.env.MONGO_URL;
const client: MongoClient = new MongoClient(mongoURI!);

export const database: Db = client.db(SETTINGS.DB_NAME);

export const blogsCollections = database.collection<BlogDbType>(SETTINGS.COLLECTION_BLOGS!);
export const postsCollections = database.collection<PostDbType>(SETTINGS.COLLECTION_POSTS!);

export const connectToDB = async (port: number) => {
    try {
        await client.connect()
        console.log('connected to db')
        console.log(`Example app listening on port ${port}`)
    } catch (e) {
        console.log(e)
        await client.close()
    }
}