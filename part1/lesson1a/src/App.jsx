const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}


/*Each component must be capitalized*/ 
const Hello = (props) => {
  console.log(props)
  return (
    <div>
        Hello {props.name}, you are {props.age} years old
    </div>
  )
}

const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
      <Footer/>
    </div>

  )
}

export default App