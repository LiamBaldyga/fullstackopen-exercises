import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const sorted = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

  return (
    <div>
      <h2 className='text-center'>Blogs</h2>
      <NewBlogForm />
      <Table striped>
        <tbody>
          {sorted.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
