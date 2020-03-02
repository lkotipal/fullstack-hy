import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { upvote } from './../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(upvote(id))
  }

  return (
    <div>{anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} onVote={vote}/>)}</div>
  )
}

export default AnecdoteList