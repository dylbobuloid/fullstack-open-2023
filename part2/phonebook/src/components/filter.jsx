import React from "react";

const Filter = ({ newSearch, handleSearchChange }) => {

    return (
      <div>
        filter shown with<input value={newSearch}
          onChange={handleSearchChange}>
        </input>
      </div>
    )
  
  }


  export default Filter;