import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/filter";
import noteService from './services/persons'
import Name from './components/name'
import PersonForm from './components/PersonForm';

const Notification = ({ message, type }) => {
  if (message == null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
      number: newNumber
    }

    const nameExists = persons.some(person => person.name === newName)
    const numberExists = persons.some(person => person.number === newNumber)
    //find the object with the matching number



    console.log("The name exists in the phonebook", nameExists)

    // if (nameExists) {
    //   window.alert(`${newName} is already added to phonebook`)
    //   setNewName('')
    //   setNewNumber('')
    //   return
    // }

    if (nameExists) {
      const toReplace = persons.find(p => p.name === newName) //Find the person obj with matching name

      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        console.log("starting PUT promise")
        //Axios req to update that person obj with new number

        console.log("ID to replace ", toReplace.id)
        console.log("NEW person OBJECT", personObject)

        noteService
          .update(toReplace.id, personObject)
          .then(updatedNumber => {
            console.log("RESPONSE", updatedNumber)
            console.log("Person to be replaced", toReplace)
            console.log("Current PERSONS", persons)
            //setPersons(persons.concat(returnedNumber))

            //Success Message for CHANGING new number to Phonebook
            setSuccessMessage(
              `Changed ${toReplace.name} `
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)

            setPersons(persons.map(p =>
              p.id === toReplace.id ? updatedNumber : p
            ))

            console.log("state of persons", persons)
          })

          .catch(error => {

            console.log(error)
            console.log(`There was an error changing Name '${toReplace.name}' `)
            setErrorMessage(
              `Information of ${toReplace.name} has already been removed from the server `
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

          })
      }
    }

    else {
      noteService
        .create(personObject)
        .then(returnedNumber => {
          console.log("returned number", returnedNumber)
          setPersons(persons.concat(returnedNumber))
          console.log("post request complete")

          //Success Message for adding new number to Phonebook
          setSuccessMessage(
            `Added ${returnedNumber.name} `
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
        })

        //Somewhere here I need to change the error message to alert the user that a number has been added
        // to the
        .catch(error => {
          setErrorMessage(
            `The number '${person}' was doesn't exist`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    }
    setNewName('')
    setNewNumber('')
  }

  const removeNumber = id => {


    const nameToRemove = persons.find(p => p.id === id)
    console.log("THIS IS THE NAME TO REMOVE")
    console.log('toremoveobj', nameToRemove)
    console.log(nameToRemove.name)

    if (window.confirm(`Delete ${nameToRemove.name}?`)) {
      noteService
        .remove(id)
        .then(removedPerson => {
          console.log("Number deleted ", removedPerson)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log("Person cannot be found")
        })
    }
  }

  const Persons = ({ persons, newSearch }) => {
    return (

      persons.filter(person => person.name.toLowerCase()
            .includes(newSearch.toLowerCase()))
                    .map(person =>
                              <Name key={person.id} person={person} removeNumber={removeNumber} />
                                      )
    )
  }

  return (
    <div>
      {/* <div>debug name: {newName}</div>
      <div>debug number: {newNumber}</div>
      <div>debug search: {newSearch}</div> */}

      <h2>Phonebook</h2>
      <Notification
        message={errorMessage}
        type={"error"} />
      <Notification
        message={successMessage}
        type={"success"} />

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h3>Add a new number </h3>

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