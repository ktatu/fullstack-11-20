const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_utils/blog_test_helper")

jest.setTimeout(50000)

let token

beforeAll(async () => {
    await User.deleteMany({})
    await api.post("/api/users").send(helper.blogTestUser)
    const result = await api
        .post("/api/login")
        .send({ username: helper.blogTestUser.username, password: helper.blogTestUser.password })
    token = result.body.token
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe("GET-request / blog-retrieval tests", () => {
    test("get-request status '200' and content-type 'application/json'", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("retrieval from database returns correct amount of blogs", async () => {
        let blogs = await helper.blogsFromDatabase()
        expect(blogs).toHaveLength(6)
    })

    test("field _id doesnt exist in retrieved blogs", async () => {
        let blogs = await helper.blogsFromDatabase()
        expect(blogs[0]._id).toBeFalsy()
    })

    test("field id exists in retrieved blogs", async () => {
        let blogs = await helper.blogsFromDatabase()
        expect(blogs[0].id).toBeDefined()
    })
})

describe("POST-request / blog-saving related tests", () => {
    test("post-request receives 201 status and Content-Type is application/json", async () => {
        await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(helper.testBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const res = await api.get("/api/blogs")

        const blogsFromDbWithoutId = helper.blogsWithoutId(res.body)

        expect(blogsFromDbWithoutId).toContainEqual(helper.testBlog)
        expect(blogsFromDbWithoutId).toHaveLength(helper.initialBlogs.length + 1)
    })

    test("post-request without authorization token receives 401 status", async () => {
        const result = await api.post("/api/blogs").send(helper.testBlog).expect(401)
        expect(result.body.error).toContain("invalid token")
    })

    test("post-request with invalid authorization token receives 401 status", async () => {
        const invalidToken = token.substring(0, token.length - 2)
        const result = await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${invalidToken}`)
            .send(helper.testBlog)
            .expect(401)
        expect(result.body.error).toContain("invalid token")
    })

    test("blog added without field 'likes' defaults to 0 likes", async () => {
        let blogToAdd = helper.blogWithFieldRemoved(helper.testBlog, "likes")

        const req = await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(blogToAdd)
        const res = await api.get("/api/blogs")
        const blogsFromDbWithoutId = helper.blogsWithoutId(res.body)

        Promise.all([req, res, blogsFromDbWithoutId])

        expect(blogsFromDbWithoutId).toContainEqual(helper.testBlog)
    })

    test("blog without field 'title' doesnt get saved", async () => {
        await api
            .post("/api/blogs")
            .send(helper.blogWithFieldRemoved(helper.testBlog, "title"))
            .set("Authorization", `bearer ${token}`)
            .expect(400)
    })

    test("blog without field 'url' doesnt get saved", async () => {
        await api
            .post("/api/blogs")
            .send(helper.blogWithFieldRemoved(helper.testBlog, "url"))
            .set("Authorization", `bearer ${token}`)
            .expect(400)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})
