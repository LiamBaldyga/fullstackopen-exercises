import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) return null

  return (
    <Alert variant='success' id='notification'>
      {notification}
    </Alert>
  )
}

export default Notification
