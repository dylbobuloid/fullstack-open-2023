import { useState } from 'react'

const Button = ({ onClick, text }) => {

  //Needs to increase the counter for whether it is good, bad or neutral
  //When the button is clicked, pass in variable to manipulate
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}




const Statistics = ({ good, neutral, bad }) => {

  console.log('these are the props', { good })

  const total = (good + neutral + bad)
  const average = total / 3
  const positive = (good / total) * 100

  if (total === 0) {
    return (
      <div>
        <p>no feedback given...</p>
      </div>
    )
  }

  return (
    <div>

      <table>

        <tbody>

        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive} />

        </tbody>

      </table>




    </div>

  )
}

const StatisticLine = ({ text, value }) => {

  if (text === "Positive") {
    return (

      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
  
  
    )
  }

  return (

    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {

    console.log('increasing, value before', { good })
    setGood(good + 1)
  }

  const increaseNeutral = () => {

    console.log('increasing, value before', { neutral })
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {

    console.log('increasing, value before', { bad })
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}



export default App