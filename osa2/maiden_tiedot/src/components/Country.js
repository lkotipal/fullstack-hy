import React from 'react'
import Button from './Button'

const Country = ({country, countrySelector}) => (
  <li>
    {country.name} <Button text='show' onClick={() => countrySelector(country)}/>
  </li>
)

export default Country