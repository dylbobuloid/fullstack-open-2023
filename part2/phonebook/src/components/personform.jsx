import React from "react";

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

export default PersonForm;