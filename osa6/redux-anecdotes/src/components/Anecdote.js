import React from 'react'

const AnecdoteList = ({anecdote, onVote}) => {

  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => onVote(anecdote.id)}>vote</button>
      </div>
    </li>
  )
}

export default AnecdoteList