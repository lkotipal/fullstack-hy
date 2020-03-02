import React from 'react'

const AnecdoteList = ({anecdote, onVote}) => {

  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => onVote(anecdote)}>vote</button>
      </div>
    </li>
  )
}

export default AnecdoteList