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

  export default Country;