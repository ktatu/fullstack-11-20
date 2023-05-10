import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"


const testBlog = {
    author: "Test Author",
    title: "Test Title",
    url: "https://example.com",
    likes: 1,
    user: {
        username: "testUser",
        name: "testUser"
    }
}

const mockLikeHandler = jest.fn()
const mockDeletionHandler = jest.fn()

beforeEach(() => {
    render(<Blog blog={testBlog} addLike={mockLikeHandler} deleteBlog={mockDeletionHandler} loggedInUsername="testUser" />)
})

test("like-button's event handler gets called", async () => {
    await openExpandedView()

    const button = screen.getByText("like")
    await userEvent.click(button)
    await userEvent.click(button)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
})

describe("<Blog /> renders", () => {
    //let container

    test("title in minimal view", () => {
        screen.getByText("Test Author")
    })


    describe("(in expanded view):", () => {
        beforeEach(async () => {
            await openExpandedView()
        })

        test("url", async () => {
            screen.getByText("https://example.com")
        })

        test("submitter's name", async () => {
            screen.getByText("testUser")
        })

        test("blog's likes", async () => {
            screen.getByText("likes " + testBlog.likes)
        })

    })

})

const openExpandedView = async () => {
    const showExpandedViewButton = screen.getByRole("button", { name: "View" })
    await userEvent.click(showExpandedViewButton)
}