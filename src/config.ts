import dotenv from "dotenv";
dotenv.config();

export const superConfig = {
    databaseUrl: process.env.ENV === 'test' ? process.env.DB_URI_TEST : process.env.MONGO_URL,
}