import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} key={user.id}>
                  {user.name}
                </Link>
                &nbsp;has {user.blogs.length}{' '}
                {user.blogs.length > 1 ? 'blogs' : 'blog'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
