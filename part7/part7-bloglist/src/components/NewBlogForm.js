import { createBlog } from '../reducers/blogSlice'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationSlice'
import { Button, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'

const FormModal = ({ show, setShow }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(
      createBlog({
        title,
        author,
        url,
      })
    )
    dispatch(setMessage(`a new blog by ${title} by ${author} added`))
    setShow(false)
  }

  const handleClose = () => setShow(false)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              id='title'
              placeholder='Title of the blog'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              id='author'
              placeholder='Author of the blog'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Link</Form.Label>
            <Form.Control
              id='url'
              placeholder='Link to the Blog'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const NewBlogForm = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <Button variant='primary' onClick={() => setShow(true)}>
        Create Blog
      </Button>
      <FormModal show={show} setShow={setShow} />
    </div>
  )
}

export default NewBlogForm
