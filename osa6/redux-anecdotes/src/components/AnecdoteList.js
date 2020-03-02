import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { upvote } from './../reducers/anecdoteReducer'
import { notify, empty } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.includes(state.filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    setTimeout(() => {
      dispatch(empty())
    }, 5000)
    dispatch(notify(`Upvoted "${anecdotes.find((anecdote) => (anecdote.id === id)).content}"`))
    dispatch(upvote(id))
  }

  return (
    <ul>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} onVote={vote}/>)}
    </ul>
  )
}

export default AnecdoteList