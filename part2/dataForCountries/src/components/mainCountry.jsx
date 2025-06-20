import { useState, useEffect } from 'react'
import axios from "axios";

const MainCountry = ({ country }) => {
    const [weather, setWeather] = useState(null)
    console.log("country flag", country.flag)

    console.log("COUNTRY CAPITAL", country.capital)

    const capital = country.capital

    const apiKey = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        if (!country.capital) return // don't fetch if no capital
        console.log("Fetching Weather")
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
            .catch(error => {
                console.error("Error fetching weather:", error)
            })
    }, [country.capital])

    console.log("This is the weather", weather)

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

            <h2>Weather in {country.capital}</h2>
            {weather ? (
                <>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        height="50"
                        width="50"
                    />
                    <p>Wind: {weather.wind.speed} m/s</p>
                </>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    )
}

export default MainCountry;