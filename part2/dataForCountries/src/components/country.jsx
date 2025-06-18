import React from "react";

const Country = ({country}) => {
  console.log("this is the country",country)
  return (
    <div>
      {country.name.common}
      <button>show</button>      
      <br />
    </div>
  )
}

export default Country;