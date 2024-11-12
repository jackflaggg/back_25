import {BlogDbType} from "../../../../../src/models/db/db.models";
import {blogsRepositories} from "../../../../../src/repositories/blogs/blogs.db.repository";
import {createString} from "../../../../helpers-e2e/datatests";
import {Collection, Db, MongoClient, ObjectId} from "mongodb";
import {blogsCollections, postsCollections} from "../../../../../src/db/db";



let blog: BlogDbType = {
    name: createString(10),
    description: createString(10),
    websiteUrl: createString(10),
    createdAt: new Date().toISOString(),
    isMembership: false,
};
let blogsCollectionsTest: Collection<BlogDbType>;
let postsCollectionsTest: Collection<any>;



describe('blogsRepositories', () => {
    // beforeEach(async () => {
    //     await blogsCollections.deleteMany({});
    //     await postsCollections.deleteMany({});
    // });
    beforeAll( () => {
        // console.log("Подключение к базе данных...");
        // client = await MongoClient.connect(SETTINGS.DB_URI_TEST);
        // console.log("Подключение успешно!");
        // db = client.db();
        blogsCollectionsTest = blogsCollections
        postsCollectionsTest = postsCollections
    });


    test('should create a new blog', async () => {
        const blogId = await blogsRepositories.createBlog(blog);
        const id = blogId
        expect(blogId).toBe(id);
        if (blogId) { // Проверка на null
            console.log(blogId, typeof blogId, new ObjectId(blogId));
            const savedBlog = await blogsCollectionsTest.findOne({ _id: new ObjectId(blogId) });
            console.log(`сохраненный блог: ${savedBlog}`)
            expect(savedBlog).toMatchObject(blog);
        } else {
            throw new Error("Failed to create a blog, blogId is null");
        }
    });

    test('should update an existing blog', async () => {
        // Аналогично, добавьте логику обновления
    });

    test('should delete a blog', async () => {
        // Аналогично, добавьте логику удаления
    });

    test('should create a post to an existing blog', async () => {
        // Аналогично, добавьте логику
    });
});
