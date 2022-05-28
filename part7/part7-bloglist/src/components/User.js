import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2 className='text-center'>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
