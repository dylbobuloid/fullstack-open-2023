import { useState } from 'react'

const Button = ({onClick, text}) => {
  
  return (
    <div>
    <button onClick={onClick}>
      {text}
    </button>
    </div>
  )

}

const MostVotes = ({anecdotes, points}) => {
  let topPoints = 0
  let topAnecdote = 0

    //attribute with th highest votes is set to topPoints
    // votes is 

  for (const p in points){

    if (points[p] > topPoints){
      topPoints = points[p]
      topAnecdote = p 
      console.log('most votes', {topPoints})
    }

  }
  
  console.log('The most votes is anecdote', anecdotes[topAnecdote], 'with votes ', topPoints)
  return (
    <div>
      <p>{anecdotes[topAnecdote]}</p>
      <p>has {topPoints} votes</p>
    </div>

  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0})

  const updatePoints = () => {
    console.log('Updating vote, points for anecdote', {selected}, 'was: ', points[selected])
    console.log('What the points object looks like before', points)

    const pointsCopy = {...points}

    //Adding the vote for the specific anecdote
    pointsCopy[selected] +=1

    //The error is that it is copying whatever is exactly at points[X] into updated points
    // Annd not the whole object
    //const updatedPoints = points[selected] += 1
    

  
    setPoints(pointsCopy)

    console.log('These are the updated points object', points)

  }

  const randomNum = () => {
    console.log('Randomising, anecdote before', {selected})
    setSelected(Math.floor((Math.random() * anecdotes.length)))

  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes </p>
      <Button onClick={randomNum} text="next anecdote"/>
      <Button onClick={updatePoints} text="vote"/>

      <h1>anecdote with the most votes</h1>
      <MostVotes anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App