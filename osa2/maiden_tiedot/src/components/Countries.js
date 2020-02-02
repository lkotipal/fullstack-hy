import React from 'react'
import Country from './Country'

const Countries = ({countries, countrySelector}) => (
  <ul>
    {countries.map(country => <Country 
      key={country.alpha3Code} 
      country={country} 
      countrySelector={countrySelector}
    />)}
  </ul>
)

export default Countries