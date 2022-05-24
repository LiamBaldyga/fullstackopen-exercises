import { useDispatch } from "react-redux"
import { createAnec } from "../reducers/anecdoteReducer"
import { resetNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnec(content))
    dispatch(setNotification(`You added "${content}"`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);
  }

  return (
    <form onSubmit={addAnec}>
      <h2>create new</h2>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm