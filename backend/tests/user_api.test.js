const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const helper = require("./test_utils/user_test_helper")

jest.setTimeout(10000)

beforeEach(async () => {
    await User.deleteMany({})
})

describe("User validation tests", () => {
    test("Username is required", async () => {
        let newTestUser = helper.userWithFieldRemoved(helper.testUser, "username")
        const result = await api.post("/api/users").send(newTestUser).expect(400)
        expect(result.body.error).toContain("username: is required")
    })

    test("Username < 3 characters is not added", async () => {
        let newTestUser = { ...helper.testUser }
        newTestUser.username = "aa"
        const result = await api.post("/api/users").send(newTestUser).expect(400)
        expect(result.body.error).toContain("Username minimum length 3 characters")
    })

    test("No duplicate usernames can be added", async () => {
        let userWithDuplicateUname = { ...helper.testUser }
        userWithDuplicateUname.name = "anotherName"
        userWithDuplicateUname.password = "anotherPassword"

        await api.post("/api/users").send(helper.testUser)
        const result = await api.post("/api/users").send(userWithDuplicateUname).expect(400)
        expect(result.body.error).toContain("expected `username` to be unique")
    })

    test("Password < 3 characters is not added", async () => {
        let newTestUser = { ...helper.testUser }
        newTestUser.password = "aa"
        const result = await api.post("/api/users").send(newTestUser).expect(400)
        expect(result.body.error).toContain("Password minimum length 3 characters")
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
