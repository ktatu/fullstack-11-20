import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser")

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            console.log("blogs ", blogs)
            blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
            setBlogs( blogs )
        })
    }, [])

    const notify = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, 3000)
    }

    const handleLogout = async () => {
        window.localStorage.removeItem("loggedUser")
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            setUser(user)
            setUsername("")
            setPassword("")

            blogService.setToken(user.token)

            const loggedUserJSON = JSON.stringify(user)
            window.localStorage.setItem("loggedUser", loggedUserJSON)
        } catch (exception) {
            notify(exception.response.data.error)
        }
    }

    const createBlog = async (blog) => {
        try {
            const returnedBlog = await blogService.create(blog)
            blogFormRef.current.toggleVisibility()
            setBlogs(blogs.concat({ ...returnedBlog, user: user }))
            console.log("user ", user)
            notify(`${returnedBlog.title} by ${returnedBlog.author} added`)
        } catch (exception) {
            console.log(exception)
        }
    }

    const updateLikes = async (blog) => {
        try {
            const changedBlog = await blogService.update(blog)

            const newBlogsArray = blogs
                .filter((blog) => blog.id !== changedBlog.id)
                .concat(changedBlog)
                .sort((blog1, blog2) => blog2.likes - blog1.likes)

            setBlogs(newBlogsArray)
        } catch (exception) {
            console.log(exception)
        }
    }

    const deleteBlog = async (blogId) => {
        try {
            await blogService.remove(blogId)
            setBlogs(blogs.filter((blog) => blog.id !== blogId))
        } catch (exception) {
            console.log(exception)
        }
    }

    if (user === null) {
        return (
            <>
                <Notification message={notification} />
                <h2>Please login</h2>
                <LoginForm
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </>
        )
    }

    return (
        <div>
            <Notification message={notification} />

            <h2>blogs</h2>
            <p>
                {user.name} logged in <button onClick={handleLogout}>logout</button>
            </p>

            <h2>create new</h2>

            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm
                    createBlog={createBlog}
                />
            </Togglable>

            <br />

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} addLike={updateLikes} loggedInUsername={user.username} deleteBlog={deleteBlog} />
            )}
        </div>
    )
}

export default App