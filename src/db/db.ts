import {Db, MongoClient} from "mongodb";
import dotenv from 'dotenv'
import {
    APICollection,
    BlackListDbType,
    BlogDbType,
    CommentDbType,
    PostDbType,
    UserDbType
} from "../models/db/db.models";
import {SETTINGS} from "../settings";
import {superConfig} from "../config";


dotenv.config()

export const mongoURI = superConfig.databaseUrl;
const client: MongoClient = new MongoClient(mongoURI!);

export const database: Db = client.db(SETTINGS.DB_NAME);

export const blogsCollections = database.collection<BlogDbType>(SETTINGS.COLLECTION_BLOGS!);
export const postsCollections = database.collection<PostDbType>(SETTINGS.COLLECTION_POSTS!);
export const usersCollection = database.collection<UserDbType>(SETTINGS.COLLECTION_USERS!);
export const commentsCollection = database.collection<CommentDbType>(SETTINGS.COLLECTION_COMMENTS!);
export const blackListTokenCollection = database.collection<BlackListDbType>(SETTINGS.COLLECTION_TOKEN!)
export const callToAPICollections = database.collection<APICollection>(SETTINGS.COLLECTION_API!);

export const connectToDB = async (port: number) => {
    try {
        await client.connect()
        console.log('connected to db')
        console.log(`App listening on port ${port}`)
    } catch (err) {
        console.error('Failed to connect to DB', err);
        process.exit(1);
        //await client.close()
    }
}