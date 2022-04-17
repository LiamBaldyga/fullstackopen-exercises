import { useState } from 'react'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({ feedback, text }) => {
  return (
    <tr>
      <td>{text} {feedback}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.total === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text={'good'} feedback={props.good}/>
        <StatisticsLine text={'neutral'} feedback={props.neutral}/>
        <StatisticsLine text={'bad'} feedback={props.bad}/>
        <StatisticsLine text={'total'} feedback={props.total}/>
        <StatisticsLine text={'average'} feedback={props.averageFeedback()}/>
        <StatisticsLine text={'positive'} feedback={props.positiveFeedback()}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  const averageFeedback = () => {
    if(total === 0) return 'None'
    return (good*1 + neutral*0 + bad*-1)/ total
  }

  const positiveFeedback = () => {
    if(total === 0) return 'None'
    return good / total + '%'
  }

  const goodFeedback = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodFeedback} text={'good'}/>
      <Button onClick={neutralFeedback} text={'neutral'}/>
      <Button onClick={badFeedback} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} averageFeedback={averageFeedback} positiveFeedback={positiveFeedback}/>
    </div>
  )
}

export default App