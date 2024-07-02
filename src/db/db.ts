import {Db, MongoClient} from "mongodb";
import dotenv from 'dotenv'
import {BlogDbType, PostDbType} from "../models/db/db.models";
import {SETTINGS} from "../settings";

dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb+srv://jackflagg:230900@clustersprint3.g4fqcoz.mongodb.net?retryWrites=true&w=majority&appName=ClusterSprint3'
const client: MongoClient = new MongoClient(mongoURI!);

export const database: Db = client.db(SETTINGS.DB_NAME);

export const blogsCollections = database.collection<BlogDbType>(SETTINGS.COLLECTION_BLOGS);
export const postsCollections = database.collection<PostDbType>(SETTINGS.COLLECTION_POSTS);

export const connectToDB = async (port: number) => {
    try {
        console.log(SETTINGS.COLLECTION_BLOGS)
        console.log(SETTINGS.COLLECTION_POSTS)
        console.log(mongoURI)
        await client.connect()
        console.log('connected to db')
        console.log(`Example app listening on port ${port}`)
    } catch (e) {
        console.log(e)
        await client.close()
    }
}