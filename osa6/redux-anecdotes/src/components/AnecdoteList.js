import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { upvote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.includes(state.filter)))
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    dispatch(upvote(anecdote))
    dispatch(setNotification(`Upvoted "${anecdote.content}"`, 10))
  }

  return (
    <ul>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} onVote={vote}/>)}
    </ul>
  )
}

export default AnecdoteList