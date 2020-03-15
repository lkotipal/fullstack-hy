import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { MY_FAVORITE, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
  const favoriteGenreRes = useQuery(MY_FAVORITE)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [favorite, setFavorite] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks({ 'variables': { 'genre': favorite }})
  }, [favorite])

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if(!favoriteGenreRes.loading && favoriteGenreRes.data.me) {
      setFavorite(favoriteGenreRes.data.me.favoriteGenre)
    }
  }, [favoriteGenreRes])

  if(!props.show) {
    return null
  }

  if (favoriteGenreRes.loading) {
    return (<div>Loading</div>)
  }

  if (result.loading || !result.called) {
    return (<div>Loading</div>)
  }


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {favorite}</p>
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
    </div>
  )
}

export default Recommended