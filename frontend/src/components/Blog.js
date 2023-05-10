import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, addLike, loggedInUsername, deleteBlog }) => {
    const [expandedBlogViewState, setExpandedBlogViewState] = useState(false)

    const handleBlogView = () => {
        setExpandedBlogViewState(!expandedBlogViewState)
    }

    const handleLikeButton = (event) => {
        event.preventDefault()

        let newLikes = (blog.likes += 1)
        addLike({ ...blog, likes: newLikes, user: blog.user.id })
    }

    const handleBlogRemoval = () => {
        deleteBlog(blog.id)
    }

    const showDeleteButton = { display: loggedInUsername === blog.user.username ? "" : "none" }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 5,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    }

    const MinimalBlogView = () => {
        return (
            <div>
                <div>{blog.title}</div>
                <div>{blog.author}</div>
                <button
                    className="expandedViewButton"
                    id={"expandedViewButton-" + blog.id}
                    onClick={handleBlogView}
                >
                    View
                </button>
            </div>
        )
    }

    const ExpandedBlogView = () => {
        return (
            <div>
                <span className="blog-title">{blog.title}</span> {blog.author}
                <button onClick={handleBlogView}>Hide</button>
                <br />
                <div>{blog.url}</div>
                <br />
                <div>
                    likes {blog.likes}{" "}
                    <button
                        className="like-button"
                        onClick={handleLikeButton}
                    >
                        like
                    </button>
                </div>
                <br />
                <div>{blog.user.name}</div>
                <br />
                <div style={showDeleteButton}>
                    <button onClick={handleBlogRemoval}>delete</button>
                </div>
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {expandedBlogViewState ? <ExpandedBlogView /> : <MinimalBlogView />}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    loggedInUsername: PropTypes.string.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default Blog
