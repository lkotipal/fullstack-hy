import React from 'react'

const Search = ({value, onChange}) => (
  <div>
    Find countries <input value={value} onChange={onChange}/>
  </div>
)

export default Search