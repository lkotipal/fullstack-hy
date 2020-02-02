import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelected([])
  }

  const filterCountries = () => {
    const filtered = countries.filter((country) => 
      country.name.match(new RegExp(filter, 'i'))
    )
    const exactFiltered = filtered.filter((country) => {
      return(country.name.toLowerCase() === filter.toLowerCase())
    })

    return exactFiltered.length > 0 ? exactFiltered : filtered
  }

  const selectCountry = (country) => {
    setSelected([country])
  }

  const filteredCountries = selected.length > 0 ? selected : filterCountries()

  return(
    <div>
      <h1>Countries of the world</h1>
      <Search value={filter} onChange={handleFilterChange}/>
      {filteredCountries.length > 0 ? 
        filteredCountries.length === 1 ?
          <CountryDetails country={filteredCountries[0]}/> :
          filteredCountries.length > 10 ?
            <p>Too many matches, specify another filter</p> :
            <Countries countries={filteredCountries} countrySelector={selectCountry}/> : 
        <p>No matches found</p>
      }
    </div>
  )
}

export default App