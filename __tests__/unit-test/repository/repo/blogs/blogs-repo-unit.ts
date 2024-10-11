// import {BlogDbType} from "../../../../../src/models/db/db.models";
// import {InUpdateBlogModel} from "../../../../../src/models/blog/input/input-type-blogs";
// import {blogsRepositories} from "../../../../../src/repositories/blogs/blogs-db-repository";
// import {createString} from "../../../../helpers-e2e/datatests";
// import * as mongoose from "mongoose";
//
// const clearTestDatabase = async () => {
//     const collections = mongoose.connection.collections;
//     console.log(collections)
//     for (const key in collections) {
//         await collections[key].deleteMany({});
//     }
// };
// beforeAll(async () => {
//     const dbUri =  process.env.DB_URI_TEST;
//     await mongoose.connect(dbUri!);
//     await clearTestDatabase()
// });
//
// afterAll(async () => {
//     await mongoose.disconnect();
// });
//
// describe('blogsRepositories', () => {
//     const blogSample: BlogDbType = {
//         name: createString(11),
//         description: createString(11),
//         websiteUrl: createString(11),
//         createdAt: new Date().toISOString(),
//         isMembership: false
//     };
//
//     const updateBlogData: InUpdateBlogModel = {
//         name: 'Updated Blog',
//         description: 'Updated description',
//         websiteUrl: 'http://updated.com',
//     };
//
//     it('должен создавать блог', async () => {
//         const blogId = await blogsRepositories.createBlog(blogSample);
//         expect(blogId).not.toBeNull();
//     });
//
//     it('должен обновлять блог', async () => {
//         const blogId = await blogsRepositories.createBlog(blogSample);
//         console.log(blogId)
//         const result = await blogsRepositories.putBlog(blogId!, updateBlogData);
//         console.log(result)
//         expect(result).toBe(true);
//     });
//
//     it('должен удалять блог', async () => {
//         const blogId = await blogsRepositories.createBlog(blogSample);
//         const result = await blogsRepositories.delBlog(blogId!);
//         expect(result).toBe(true);
//     });
//
//     // it('должен возвращать null при создании поста для несуществующего блога', async () => {
//     //     const result = await blogsRepositories.createPostToBlogID('nonexistentId', { content: 'Post content' });
//     //     expect(result).toBeNull();
//     // });
// });

const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const client = new MongoClient('mongodb://localhost:27017');

    try {
        await client.connect();
        console.log("Соединение с базой данных успешно установлено.");
        return client.db('yourDatabaseName');
    } catch (error) {
        console.error('Ошибка при подключении к базе данных:', error);
        throw error; // пробросьте ошибку дальше
    }
}

async function getCollections() {
    try {
        const db = await connectToDatabase();
        if (!db) {
            throw new Error('База данных не определена');
        }

        const collections = await db.collections();
        console.log('Доступные коллекции:', collections);
        return collections;
    } catch (error) {
        console.error('Ошибка при получении коллекций:', error);
    }
}

getCollections();
