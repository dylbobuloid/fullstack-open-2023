import { useState } from 'react'



const Filter = ({newSearch, handleSearchChange}) => {

  return(
    <div>
    filter shown with<input value={newSearch}
      onChange={handleSearchChange}>
    </input>
    </div>
  )

}


const PersonForm = ({addNewPerson, newName, handlePersonChange, newNumber, handleNameChange }) => {

  return(

    <form onSubmit={addNewPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handlePersonChange}
        />
      </div>

      <div>
        number: <input
          value={newNumber}
          onChange={handleNameChange}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )

}

const Persons = ({persons, newSearch}) => {
  return(
    persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person =>
      <p key={person.name}> {person.name} {person.number}</p>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: '1', name: 'Arto Hellas', number: '0700'},
    { id: '2', name: 'John Pork', number: '0400' },
    { id: '3', name: 'Monquavious Tangerine', number: '079ooahah' },
    { id: '4', name: 'Freakbob', number: '8008135' },
    { id: '5', name: 'Monquavious Coconut', number: '00000001' },

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handlePersonChange = (event) => {

    setNewName(event.target.value)
  }

  const handleNameChange = (event) => {

    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
        
      }

      console.log(persons)
      console.log("This is the new name", newName)
      console.log("This is the new Person Object", personObject)


      const nameExists = persons.some(person => person.name === newName)

      console.log("The name exists in the phonebook", nameExists)

      if(nameExists){
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }

      else{
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }

  }

  return (
    <div>
      <div>debug name: {newName}</div>
      <div>debug number: {newNumber}</div>
      <div>debug search: {newSearch}</div>

  

      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h3>Add a new </h3>

      <PersonForm addNewPerson ={addNewPerson} newName={newName} handlePersonChange={handlePersonChange}
       newNumber={newNumber} handleNameChange={handleNameChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch}/>

    </div>
  )
}

export default App