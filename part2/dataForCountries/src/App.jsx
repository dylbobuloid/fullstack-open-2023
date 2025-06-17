import { useState, useEffect } from 'react'
import axios from "axios";

const Filter = ({ newSearch, handleSearchChange }) => {

  return (
    <div>
      find countries: <input value={newSearch}
        onChange={handleSearchChange}>
      </input>
    </div>
  )

}

const Country = ({ name }) => {
  return (
    <div>
      {name} <br />
    </div>
  )
}

const MainCountry = ({ country }) => {
  console.log("country flag", country.flag)

  return (
    <div key={country.cca3}>
      <h1>{country.name.common}</h1>

      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>

      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>


      <p>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          height="100"
          width="150"
        />
      </p>

    </div>
  )
}


function App() {

  const [countries, setCountries] = useState([]) //Countries we will be searchng
  const [newSearch, setNewSearch] = useState('') //Current search entry

  useEffect(() => {
    console.log('fetching countries...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  //console.log("current countries", countries)
  console.log("current search", newSearch)



  const handleSearchChange = (event) => { setNewSearch(event.target.value) }



  const Countries = ({ countries }) => {

    const countriesFiltered = countries.filter(country =>
      country.name.common.toLowerCase()
        .includes(newSearch.toLowerCase()))

    console.log("Filtered Countries", countriesFiltered)

    if (countriesFiltered.length == 1) {
      console.log("There's only 1 country", countriesFiltered)

      const country = countriesFiltered[0]


      return (
        <MainCountry country={country} />
      )

    }
    else if (countriesFiltered.length < 10) {
      return (
        countriesFiltered.map(country => <Country key={country.cca3} name={country.name.common} />)
      )

    }
    else {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>

      )
    }
  }


  return (
    <>
      <div>
        <h1>Country Information</h1>
        <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
        {/* <ul>
          {countries > 10 && 
          <p>Too many matches, specify another filter</p>}

        </ul> */}
        <Countries countries={countries} />

      </div>
    </>
  )
}

export default App
