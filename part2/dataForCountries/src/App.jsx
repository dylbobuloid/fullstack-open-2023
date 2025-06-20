import { useState, useEffect } from 'react'
import axios from "axios";
import Filter from './components/filter'
import MainCountry from './components/mainCountry';


function App() {

  const [countries, setCountries] = useState([]) //Countries we will be searchng
  const [newSearch, setNewSearch] = useState('') //Current search entry
  const [selectedCountry, setSelectedCountry] = useState(null) //Current country to view
  const [weather, setWeather] = useState(null)

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
  console.log("current selected Country", selectedCountry)


  const handleSearchChange = (event) => { setNewSearch(event.target.value) }

  const Country = ({ country }) => {
    console.log("this is the country", country)

    if (selectedCountry && selectedCountry.name.common == country.name.common) {
      return (
        <MainCountry country={country} />
      )

    } else {
      return (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)} >show</button>

          <br />
        </div>
      )
    }
  }



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
        countriesFiltered.map(country =>
          <Country key={country.cca3} country={country} />)
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

        <Countries countries={countries} />

      </div>
    </>
  )
}

export default App
