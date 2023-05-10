import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState("")
    const [blogAuthor, setBlogAuthor] = useState("")
    const [blogUrl, setBlogUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({ title: blogTitle, author: blogAuthor, url: blogUrl })

        setBlogTitle("")
        setBlogAuthor("")
        setBlogUrl("")
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input id="title-input" type="text" value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} />
                </div>
                <div>
                    author:
                    <input id="author-input" type="text" value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} />
                </div>
                <div>
                    url:
                    <input id="url-input" type="text" value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)} />
                </div>
                <button id="blog-submit" type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm