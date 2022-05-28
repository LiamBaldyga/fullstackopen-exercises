import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/userSlice'
import { Button } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <span>
      {user.name} logged in
      <Button variant='primary' onClick={() => dispatch(logOut())}>
        logout
      </Button>
    </span>
  )
}

export default Login
