import {SETTINGS} from "../../src/settings";
import {req} from "../helpers-e2e/agent";
import {HTTP_STATUSES} from "../../src/models/common/common.types";
import {codedAuth, createString, inCodedAuth} from "../helpers-e2e/datatests";
import {connect, disconnect} from "../helpers-e2e/mongodb.memory.test.helper";
import {ObjectId} from "mongodb";
import {InCreateBlogModel, InUpdateBlogModel} from "../../src/models/blog/input/input.type.blogs";

let blog : {[key : string]: string} | undefined;

describe(SETTINGS.PATH.BLOGS, () => {
    beforeAll(connect);
    afterAll(disconnect);

    beforeAll(async () => {
        await req.delete(`${SETTINGS.PATH.TESTING}/all-data`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });
    // it.skip
    it('+Get method: return status 200 and all videos', async () => {
        const response = await req
            .get(`${SETTINGS.PATH.BLOGS}`)
            .send()
            .expect(HTTP_STATUSES.OK_200)
    });

    it('+Post method correct body(all data), return bodyBlog and status 201', async () => {
        const newBlog: InCreateBlogModel = {
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
    });

    it('+Get method: correct reqParams - id, return status 200 and one blogs', async () => {
        const response = await req
            .get(`${SETTINGS.PATH.BLOGS}/${blog!.id}`)
            .expect(HTTP_STATUSES.OK_200, blog)
    });

    it('-Get method: incorrect reqParams - id, return status 404 and one blogs', async () => {
        const incorrectBlogId = {
            id: new ObjectId('5f826d1e6c2c8e452c9a9567'),
            name: createString(2),
            description: createString(2),
            websiteUrl: "https://hz.com",
            createdAt: new Date().toISOString(),
            isMembership: true
        }
        const response = await req
            .get(`${SETTINGS.PATH.BLOGS}/${incorrectBlogId.id}`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('-Post method incorrect body and status 400', async() => {
        const incorrectBlog: InCreateBlogModel ={
            name: createString(20),
            description: createString(511),
            websiteUrl: createString(122),
        }

        const response = await req
            .post(`${SETTINGS.PATH.BLOGS}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(incorrectBlog)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    });

    it('-Post method - not authorized', async() => {
        const response = await req
            .post(`${SETTINGS.PATH.BLOGS}`)
            .set({'Authorization': 'Basic ' + inCodedAuth})
            .send(blog)
            .expect(HTTP_STATUSES.NOT_AUTHORIZATION_401)
    })

    it('+Put method correct id and reqbody, return status 204', async() => {
        const updatedBlog: InUpdateBlogModel = {
            name: createString(2),
            description: createString(2),
            websiteUrl: createString(2)
        };

        const updatedBlogWithId = { ...blog, ...updatedBlog };
        const response = await req
            .put(`${SETTINGS.PATH.BLOGS}/${blog!.id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(updatedBlog)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    });

    it('-Put method correct id and incorrect reqbody, return status 400', async() => {

        let updatedBlog = {
            id: blog!.id,
            name: createString(2100),
            description: createString(20000),
            websiteUrl: createString(2)
        }

        //updatedBlog = {...blog, ...updatedBlog}
       // db.blogs.push(updatedBlog)

        const response = await req
            .put(`${SETTINGS.PATH.BLOGS}/${updatedBlog!.id}`)
            .set({'Authorization': 'Basic ' + codedAuth})
            .send(blog)
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-Put method - not auth, return status 401', async() => {
        blog = {
            ...blog,
            title: createString(2100),
        }

        const response = await req
            .put(`${SETTINGS.PATH.BLOGS}/${blog.id}`)
            .set({'Authorization': 'Basic ' + inCodedAuth + 'error!'})
            .send(blog)
            .expect(HTTP_STATUSES.NOT_AUTHORIZATION_401);
    });

    it('-Put method incorrect id and reqbody, return status 404', async() => {
        const updatedBlog = {
            "id": "string",
            "name": "string",
            "description": "string",
            "websiteUrl": "string",
            "createdAt": "2024-07-07T18:30:50.838Z",
            "isMembership": true
        }
        const response = await req
            .put(`${SETTINGS.PATH.BLOGS}/${updatedBlog.id}`)
            .set('Authorization', 'Basic ' + codedAuth)
            .send(blog)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });

    it('+Delete method correct id, return status 204', async() => {
        const response = await req
            .delete(`${SETTINGS.PATH.BLOGS}/${blog!.id}`)
            .set('Authorization', 'Basic ' + codedAuth)
            .expect(HTTP_STATUSES.NO_CONTENT_204);
    });

    it('-Delete method - not auth status 401', async() => {
        const response = await req
            .delete(`${SETTINGS.PATH.BLOGS}/${blog!.id}`)
            .set('Authorization', 'Basic ' + inCodedAuth)
            .expect(HTTP_STATUSES.NOT_AUTHORIZATION_401);
    });

    it('-Delete method incorrect id, return status 404', async() => {
        const response = await req
            .delete(`${SETTINGS.PATH.BLOGS}/${blog!.id}`)
            .set('Authorization', 'Basic ' + codedAuth)
            .expect(HTTP_STATUSES.NOT_FOUND_404);
    });
})