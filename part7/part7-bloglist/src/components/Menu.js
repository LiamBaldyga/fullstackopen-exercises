import { Link } from 'react-router-dom'
import Login from '../components/Login'
import { Navbar, Nav } from 'react-bootstrap'
import { logOut } from '../reducers/userSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const LogoutModal = ({ show, setShow }) => {
  const dispatch = useDispatch()

  const confirmLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
    setShow(false)
  }

  const handleClose = () => setShow(false)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to logout?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='primary' onClick={confirmLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const Menu = ({ user }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to='/users'>
              Users
            </Nav.Link>
            <Nav.Link as={Link} to='/' onClick={() => setShow(true)}>
              Logout of {user.name}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LogoutModal show={show} setShow={setShow} />
    </>
  )
}

export default Menu
