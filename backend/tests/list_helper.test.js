const listHelper = require("../utils/list_helper")

const listWithOneBlog = [{ 
	_id: "fawrt2q52ar", 
	author: "testAuthor",
	url: "testUrl",
	likes: 5,
	__v: 0
}]

const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
	{ _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, 
	{ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
	{ _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
	{ _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
	{ _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

test("dummy returns one", () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe("total likes", () => {
	test("list is empty, result is zero:", () => {
		const res = listHelper.totalLikes([])
		expect(res).toBe(0)
	})

	test("list has one blog, test result equals its likes:", () => {
		const res = listHelper.totalLikes(listWithOneBlog)
		expect(res).toBe(5)
	})

	test("list has many blogs, test result equals the sum of their likes:", () => {
		const res = listHelper.totalLikes(blogs)
		expect(res).toBe(36)
	})
})

describe("blog with most likes", () => {
	test("list is empty, result is undefined", () => {
		const res = listHelper.favoriteBlog([])
		expect(res).toBe(undefined)
	})

	test("list has one blog, result is the same blog:", () => {
		const res = listHelper.favoriteBlog(listWithOneBlog)
		expect(res).toEqual(listWithOneBlog[0])
	})

	test("list has many blogs, result is the blog with most likes:", () => {
		const res = listHelper.favoriteBlog(blogs)
		expect(res).toEqual(blogs[2])
	})
})

describe("author with most blogs", () => {
	test("empty list, result is undefined", () => {
		const res = listHelper.mostBlogs([])
		expect(res).toBe(undefined)
	})

	test("one blog, result is object with the same author and one blog", () => {
		const res = listHelper.mostBlogs(listWithOneBlog)
		const expectedRes = { author: listWithOneBlog[0].author, blogs: 1 }

		expect(res).toEqual(expectedRes)
	})

	test("many blogs, result is author with most blogs written", () => {
		const res = listHelper.mostBlogs(blogs)
		const expectedRes = { author: "Robert C. Martin", blogs: 3 }

		expect(res).toEqual(expectedRes)
	})
})

describe("author with total most likes", () => {
	test("empty list, result is undefined", () => {
		const res = listHelper.mostLikes([])
		expect(res).toBe(undefined)
	})

	test("one blog, result is object with its author and likes", () => {
		const res = listHelper.mostLikes(listWithOneBlog)
		expect(res).toEqual({ author: "testAuthor", likes: 5 })
	})

	test("many blogs, result-object has author with most likes and the amount", () => {
		const res = listHelper.mostLikes(blogs)
		expect(res).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
	})
})



