import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}

const Display = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const MaxVoted = ({anecdotes, votes}) => {
  const highestVotes = Math.max(...votes)
  const highestIndex = votes.indexOf(highestVotes)
  const highest = anecdotes[highestIndex]

  if(highestVotes === 0) {
    return (
      <p>no votes yet</p>
    )
  }
  return (
    <div>
      <p>{highest}</p>
      <p>with {highestVotes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])

  const nextAnecdote = () => setSelected(Math.floor((Math.random()*100%anecdotes.length)))
  const vote = () => {
    const allVotes = [...votes]
    allVotes[selected] += 1
    setVotes(allVotes)
  }


  return (
    <div>
      <Display value={anecdotes[selected]} text={''}/>
      <Display value={votes[selected]} text={'total votes:'}/>
      <Button onClick={nextAnecdote} text={'next anecdote'}/>
      <Button onClick={vote} text={'vote'}/>
      <h1>Anecdote with most votes</h1>
      <MaxVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App