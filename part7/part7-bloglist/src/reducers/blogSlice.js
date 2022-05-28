import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setMessage } from './notificationSlice'

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlogs: (state, action) => {
      state.push(action.payload)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    remove: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    update: (state, action) => {
      return state.map((blog) =>
        blog.id === state.action.id ? action.payload : blog
      )
    },
  },
})
export const { appendBlogs, setBlogs, remove, update } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlogs(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blogToChange = blogs.find((b) => b.id === id)
    const newBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    }
    await blogService.update(id, newBlog)
    const newBlogs = blogs.map((blog) => (blog.id !== id ? blog : newBlog))
    dispatch(
      setMessage(`you liked '${blogToChange.title}' by ${blogToChange.author}`)
    )
    dispatch(setBlogs(newBlogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(remove(id))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    const blogToChange = blogs.find((b) => b.id === id)
    const newBlog = {
      ...blogToChange,
      comments: [...blogToChange.comments, comment],
    }
    await blogService.comment(id, newBlog)
    const newBlogs = blogs.map((blog) => (blog.id !== id ? blog : newBlog))
    dispatch(setMessage(`you added comment ${comment}`))
    dispatch(setBlogs(newBlogs))
  }
}

export default blogSlice.reducer
