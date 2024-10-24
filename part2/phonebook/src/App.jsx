import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/persons'
import Name from './components/name'



const Filter = ({ newSearch, handleSearchChange }) => {

  return (
    <div>
      filter shown with<input value={newSearch}
        onChange={handleSearchChange}>
      </input>
    </div>
  )

}

const PersonForm = ({ addNewPerson, newName, handlePersonChange, newNumber, handleNameChange }) => {

  return (

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



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

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
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)

    }

    console.log(persons)
    console.log("This is the new name", newName)
    console.log("This is the new Person Object", personObject)


    const nameExists = persons.some(person => person.name === newName)

    console.log("The name exists in the phonebook", nameExists)

    if (nameExists) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    else {

      noteService
        .create(personObject)
        .then(returnedNumber => {
          console.log("returned number",returnedNumber)
          setPersons(persons.concat(returnedNumber))
          console.log("post request complete")
          setNewName('')
          setNewNumber('')
        })

        .catch(error => {
          alert(
            `the number '${person}' was doesn't exist`
          )
        })

    }
  }

  const removeNumber = id => {

    const nameToRemove = persons.find(p => p.id === id)
    console.log(nameToRemove.name)
  
    if (window.confirm(`Delete ${nameToRemove.name}?`)) {
      noteService
      .remove(id)
      .then(removedPerson => {
        console.log("Number deleted ",removedPerson )
        setPersons(persons.filter(person=>person.id !== id))
      })
      .catch(error=>{
        console.log("Person cannot be found")
      })
    }
  }

  const Persons = ({ persons, newSearch }) => {
    return (
      
      persons.filter(person => person.name.toLowerCase()
        .includes(newSearch.toLowerCase()))
        .map(person =>
          <Name key= {person.id} person ={person} removeNumber={removeNumber} />
        )
    )
  }

  return (
    <div>
      {/* <div>debug name: {newName}</div>
      <div>debug number: {newNumber}</div>
      <div>debug search: {newSearch}</div> */}



      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h3>Add a new </h3>

      <PersonForm 
      addNewPerson={addNewPerson} 
      newName={newName} 
      handlePersonChange={handlePersonChange}
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      />

      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />
      {/* For every person it needs to render a button
       using this         removeNumber={() => removeNumberOf(person.id)} 
      // <button onClick={removeNumber}>{label}</button>
      Create a new componenet that renders each line of a person
      Each line of the person renders a button with remove number on it */}



    </div>
  )
}

export default App