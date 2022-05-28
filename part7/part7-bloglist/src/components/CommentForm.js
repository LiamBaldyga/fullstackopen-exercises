import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogSlice'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target[0].value
    console.log(comment)

    event.target[0].value = ''

    dispatch(addComment(id, comment))
  }
  return (
    <div>
      <h3>Add comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input id='comment' placeholder='comment' name='comment' />
        </div>
        <button type='submit'>post</button>
      </form>
    </div>
  )
}

export default CommentForm
