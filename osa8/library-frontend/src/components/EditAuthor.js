import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_NAMES, ALL_BIRTHYEARS, EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const result = useQuery(ALL_NAMES)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BIRTHYEARS }]  
  })

  if (!props.show) {
    return null
  } else if (result.loading) {
    return (<div>Loading</div>)
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor