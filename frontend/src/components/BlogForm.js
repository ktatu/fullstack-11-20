import { useState } from "react"

const BlogForm = ({ addBlog }) => {

    const [blogTitle, setBlogTitle] = useState("")
    const [blogAuthor, setBlogAuthor] = useState("")
    const [blogUrl, setBlogUrl] = useState("")

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input type="text" value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} />
                </div>
                <div>
                    author: 
                    <input type="text" value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} />
                </div>
                <div>
                    url: 
                    <input type="text" value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export { BlogForm }