import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick}) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter(a => a.content.includes(filter))
    } else {
      return anecdotes
    }
  })

  const sorted = [...anecdotes].sort((b1, b2) => b2.votes - b1.votes)

  const handleVote = anecdote => {
    dispatch(vote(anecdote.id)).then(() => {
      dispatch(setNotification(`You voted for "${anecdote.content}"`, 5))
    })
  }

  return (
    <div>
      {sorted.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes