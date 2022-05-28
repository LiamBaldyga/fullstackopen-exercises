import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogSlice'
import { useNavigate } from 'react-router-dom'
import Comments from './Comment'
import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'

const DeleteButton = ({ onClick }) => {
  return (
    <div>
      <Button variant='danger' onClick={onClick}>
        delete
      </Button>
    </div>
  )
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user)
  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)
    if (!ok) {
      return
    }
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }

  return (
    <div className='blog'>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <Button onClick={handleLike}>❤️</Button>
      </div>
      <div>added by {blog.user.name}</div>
      {currentUser ? <DeleteButton onClick={handleDelete} /> : null}
      <CommentForm id={blog.id} />
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
