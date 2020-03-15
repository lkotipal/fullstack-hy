import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import EditAuthor from './components/EditAuthor'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore() 
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(subscriptionData.data.bookAdded.title.concat(' added!'))
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <EditAuthor
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended
        show={page === 'recommended'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App