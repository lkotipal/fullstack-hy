import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { notify, empty } from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)
    setTimeout(() => {
      dispatch(empty())
    }, 5000)
    dispatch(notify(`Added "${content}"`))
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote"/>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteList