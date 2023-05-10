import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
    }
  }, [])

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
        setNotification(null)
    }, 3000)
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      setUser(user)
      setUsername("")
      setPassword("")

      blogService.setToken(user.token)

      const loggedUserJSON = JSON.stringify(user)
      window.localStorage.setItem('loggedUser', loggedUserJSON)
    } catch (exception) {
      console.log(exception)
      notify(exception.response.data.error)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = { 
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
    }

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      notify(`${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
        console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <h2>Please login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />

      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>

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
      
      <br />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App