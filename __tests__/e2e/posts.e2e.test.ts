import {SETTINGS} from "../../src/settings";
import {req} from "../helpers-e2e/agent";
import {HTTP_STATUSES} from "../../src/models/common/common.types";
import {
    codedAuth,
    createString, inCodedAuth,
} from "../helpers-e2e/datatests";
import {connect, disconnect} from "../helpers-e2e/mongodb.memory.test.helper";
import {ObjectId} from "mongodb";


let post : {[key : string]: string} | undefined;
let blog : {[key : string]: string} | undefined;

describe(SETTINGS.PATH.POSTS, () => {
    beforeAll(connect);
    afterAll(disconnect);

    beforeAll(async () => {
        await req.delete(`${SETTINGS.PATH.TESTING}/all-data`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });


    it('+Get method: return status 200 and all videos', async () => {
        const response = await req
            .get(`${SETTINGS.PATH.POSTS}`)
            .send()
            .expect(HTTP_STATUSES.OK_200)
    });

    it('+Post method to Blog correct body(all data), return bodyBlog and status 201', async () => {
        const newBlog = {
            name: createString(2),
            description: createString(2),
            websiteUrl: "https://hz.com",
        }

        const response = await req
            .post(`${SETTINGS.PATH.BLOGS}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newBlog)
            .expect(HTTP_STATUSES.CREATED_201)

        blog = response.body

        const {id, name, description, websiteUrl, createdAt, isMembership} = response.body;

        expect(id).toEqual(blog!.id)
        expect(name).toEqual(blog!.name)
        expect(description).toEqual(blog!.description)
        expect(name).toEqual(blog!.name)
        expect(websiteUrl).toEqual(blog!.websiteUrl)
        expect(createdAt).toEqual(blog!.createdAt)
        expect(isMembership).toEqual(blog!.isMembership)

        expect(typeof id).toEqual('string')
        expect(typeof name).toEqual('string')
        expect(typeof description).toEqual('string')
        expect(typeof websiteUrl).toEqual('string')
        expect(typeof createdAt).toEqual('string')
        expect(typeof isMembership).toEqual('boolean')
    })

    it('+Post method to Post correct body(all data), return bodyPost and status 201', async() => {
        const newPost = {
            title: createString(2),
            shortDescription: createString(2),
            content: createString(2),
            blogId: blog!.id,
            blogName: blog!.name,
        }

        const response = await req
            .post(`${SETTINGS.PATH.POSTS}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(newPost)
            .expect(HTTP_STATUSES.CREATED_201);

        post = response.body;
        const {id, title, shortDescription, content, blogId, blogName} = response.body;

        expect(id).toEqual(post!.id)
        expect(title).toEqual(post!.title)
        expect(content).toEqual(post!.content)
        expect(shortDescription).toEqual(post!.shortDescription)
        expect(blogId).toEqual(post!.blogId)
        expect(blogName).toEqual(post!.blogName)

        expect(typeof id).toEqual('string')
        expect(typeof title).toEqual('string')
        expect(typeof shortDescription).toEqual('string')
        expect(typeof content).toEqual('string')
        expect(typeof blogId).toEqual('string')
        expect(typeof blogName).toEqual('string')
    });

    it('+Get method: correct reqParams - id, return status 200 and one blogs', async () => {
        const response = await req
            .get(`${SETTINGS.PATH.POSTS}/${post!.id}`)
            .expect(HTTP_STATUSES.OK_200)
    });

    it('-Get method: incorrect reqParams - id, return status 404 and one blogs', async () => {
        const incorrectBodyId = {
            id: new ObjectId().toString(),
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: "string",
            blogName: "string"
        }
        const response = await req
            .get(`${SETTINGS.PATH.POSTS}/${incorrectBodyId!.id }`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('-Post method incorrect body and status 400', async() => {
        const incorrectBlog ={
            name: createString(20),
            description: createString(5112),
            websiteUrl: createString(122),
        }

        const response = await req
            .post(`${SETTINGS.PATH.POSTS}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(incorrectBlog)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    });

    it('-Post method - not authorized', async() => {
        const response = await req
            .post(`${SETTINGS.PATH.POSTS}`)
            .set({'Authorization': 'Basic ' + inCodedAuth})
            .send(post)
            .expect(HTTP_STATUSES.NOT_AUTHORIZATION_401)
    })

    it('+Put method correct id and reqbody, return status 204', async() => {
        const updatedPost = {
            title: createString(20),
            shortDescription: createString(2),
            content: createString(2),
            blogId: blog!.id,
        };

        const response = await req
            .put(`${SETTINGS.PATH.POSTS}/${post!.id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedPost)
            .expect(HTTP_STATUSES.NO_CONTENT_204)
    });

    it('-Put method correct id and incorrect reqbody, return status 400', async() => {

        let updatedBlog = {
            id: post!.id,
            name: createString(2100),
            description: createString(20000),
            websiteUrl: createString(2)
        }

        const response = await req
            .put(`${SETTINGS.PATH.POSTS}/${updatedBlog!.id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(post)
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-Put method - not auth, return status 401', async() => {
        post = {
            ...post,
            title: createString(2100),
        }

        const response = await req
            .put(`${SETTINGS.PATH.POSTS}/${post.id}`)
            .set({'Authorization': 'Basic ' + inCodedAuth + 'error!'})
            .send(post)
            .expect(HTTP_STATUSES.NOT_AUTHORIZATION_401);
    });

    it('-Put method incorrect id and reqbody, return status 404', async() => {
        const incorrectBodyId = {
            id: new ObjectId('5f826d1e6c2c8e452c9a9567'),
            title: createString(20),
            shortDescription: createString(2),
            content: createString(2),
            blogId: blog!.id,
            blogName: blog!.name,
            createdAt: new Date().toISOString(),
        }
        const response = await req
            .put(`${SETTINGS.PATH.POSTS}/${incorrectBodyId!.id}`)
            .set('Authorization', 'Basic ' + codedAuth)
            .send(incorrectBodyId)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('+Delete method correct id, return status 204', async() => {
        const response = await req
            .delete(`${SETTINGS.PATH.POSTS}/${post!.id}`)
            .set('Authorization', 'Basic ' + codedAuth)
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-Delete method - not auth status 401', async() => {
        const response = await req
            .delete(`${SETTINGS.PATH.POSTS}/${post!.id}`)
            .set('Authorization', 'Basic ' + inCodedAuth)
            .expect(HTTP_STATUSES.NOT_AUTHORIZATION_401);
    });

    it('-Delete method incorrect id, return status 404', async() => {
        const response = await req
            .delete(`${SETTINGS.PATH.POSTS}/${blog!.id}`)
            .set('Authorization', 'Basic ' + codedAuth)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

})