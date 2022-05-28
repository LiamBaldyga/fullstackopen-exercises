import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userSlice'
import { Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    dispatch(loginUser(username, password))
  }

  return (
    <div className='text-center center-vertical'>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id='username' name='username' />
        </div>
        <div>
          password
          <input type='password' id='password' name='password' />
        </div>
        <Button id='login-button' type='submit' variant='primary'>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
