import { useState } from 'react'

const Button = ({ feedback, text }) => (
  <button onClick={feedback}>
    {text}
</button>
) 

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {


  if (props.good+props.neutral+props.bad === 0) {
    return (
      <div>
         No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        
        <tbody>
        
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="all" value ={props.good+props.neutral+props.bad} />
          <StatisticLine text="average" value ={((props.good-props.bad)/(props.good+props.neutral+props.bad)).toFixed(1)} />
          <StatisticLine text="positive" value ={(props.good/(props.good+props.neutral+props.bad)*100).toFixed(1) + " %"} /> 
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const feedbackGood = () => {
    setGood(good + 1)
  }

  const feedbackNeutral = () => {
    setNeutral(neutral + 1)
  }

  const feedbackBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button feedback={feedbackGood} text='good' />
      <Button feedback={feedbackNeutral} text='neutral' />
      <Button feedback={feedbackBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
