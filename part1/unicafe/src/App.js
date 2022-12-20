import { useState } from 'react'

const Button =({handleClick, text})=>(
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({votes}) => {
  // calculate statistics
  const all = votes[0] + votes[1] + votes[2]
  const avg = (votes[0] - votes[2])/all
  const pos = 100*votes[0]/all
  // don't return statistics if there are no votes yet
  return (
    all === 0
    ? <div>No feedback given</div>
    : <>
        <table>
        <StatisticLine text = "good"     value = {votes[0]}/>
        <StatisticLine text = "neutral"  value= {votes[1]}/>
        <StatisticLine text = "bad"      value = {votes[2]}/>
        <StatisticLine text = "all"      value = {all}/>
        <StatisticLine text = "average"  value = {avg}/>
        <StatisticLine text = "positive" value = {pos}/>
        </table>
      </>
  )
}

const StatisticLine = ({text, value}) => {
  // return table rows
  return (
    <tbody>
      <tr>
        <td>{text}</td> 
        <td>{value}{text === 'positive' ? ' %' : ''}</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  // usestates
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // list of states
  const votes = [good,neutral,bad]
  // eventhandlers
  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)
  
  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick = {handleGood} text = "good"/>
      <Button handleClick = {handleNeutral} text = "neutral"/>
      <Button handleClick = {handleBad} text = "bad"/>
      
      <h1>statistics</h1>
      <Statistics votes = {votes}/>

    </div>
  )
}

export default App