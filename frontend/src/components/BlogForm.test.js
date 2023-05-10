import BlogForm from "./BlogForm"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const blogInputValues = {
    author: "Test Author",
    title: "Test Title",
    url: "https://example.com",
}

const mockCreateBlog = jest.fn()

test("createBlog gets called with correct blog values", async () => {
    const container = render(<BlogForm createBlog={mockCreateBlog} />).container
    const submitBlogButton = container.querySelector("#blog-submit")

    const urlInput = container.querySelector("#url-input")
    const authorInput = container.querySelector("#author-input")
    const titleInput = container.querySelector("#title-input")

    await userEvent.type(urlInput, blogInputValues.url)
    await userEvent.type(authorInput, blogInputValues.author)
    await userEvent.type(titleInput, blogInputValues.title)

    await userEvent.click(submitBlogButton)

    expect(mockCreateBlog).toHaveBeenCalledWith(blogInputValues)
})
