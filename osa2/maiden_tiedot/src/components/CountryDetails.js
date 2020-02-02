import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({country}) =>  {
  const [weather, setWeather] = useState({})
  const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}}`
  useEffect(() => {
    axios
      .get(url).then(response => {
        setWeather(response.data.current)
      })
  }, [country, url])
  
  return(
    <div>
      <h2>{country.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Capital</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{country.capital}</td>
            <td>{country.population.toLocaleString('en-GB')}</td>
          </tr>
        </tbody>
      </table>

      <h3>Languages</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.iso639_2}>{language.name}</li>
        )}
      </ul>

      <img src={country.flag} alt={`${country.demonym} flag`} width="20%" height="20%"/>

      <h3>Weather in {country.capital}</h3>
      <div>
        <p>
          <strong>Temperature: {weather ? weather.temperature : ''}&deg;C</strong>
        </p>
        {weather && weather.weather_icons ? weather.weather_icons.map((url) => <img src={url} alt="Weather icon" />): <img alt="Weather icon"/>}
        <p>
          <strong>Wind: {weather ? weather.wind_speed : ''} mph in direction {weather ? weather.wind_dir : ''}</strong>
        </p>
      </div>
    </div>
  )
}
export default CountryDetails