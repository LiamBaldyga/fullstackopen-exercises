import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setMessage('Invalid login')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} has been added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateBlog = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject)
    setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog))
  }

  const delBlog = async (blogObject) => {
    if (window.confirm(`delete ${blogObject.title} by ${blogObject.author}?`)) {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message}/>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <p>
        {user.name} logged in
        <button type='button' onClick={logOut}>log out</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog key={blog.id} blog={blog} update={updateBlog} user={user} delBlog={delBlog} />
      )}
    </div>
  )
}

export default App
