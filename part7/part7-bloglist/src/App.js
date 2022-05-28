import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, set } from './reducers/userSlice'
import { initializeUsers } from './reducers/usersSlice'
import { Routes, Route } from 'react-router-dom'
import { useMatch } from 'react-router-dom'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import User from './components/User'

import userService from './services/user'
import { initializeBlogs } from './reducers/blogSlice'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(set(userFromStorage))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }
  return (
    <div className='container'>
      <Menu user={user} />
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={foundUser} />} />
        <Route path='/blogs/:id' element={<Blog blog={foundBlog} />} />
      </Routes>
    </div>
  )
}

export default App
