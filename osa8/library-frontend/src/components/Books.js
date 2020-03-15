import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const[genre, setGenre] = useState('')

  const genres = [
    'refactoring', 'agile', 'patterns', 'design', 'crime', 'classics'
  ]

  useEffect(() => {
    getBooks({ 'variables': { 'genre': genre }})
  }, [genre]) // eslint-disable-line

  if (!props.show) {
    return null
  } else if (result.loading) {
    return (<div>Loading</div>)
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>) }
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books