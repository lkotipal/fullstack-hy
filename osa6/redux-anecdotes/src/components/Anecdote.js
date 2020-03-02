import React from 'react'

const AnecdoteList = ({anecdote, onVote}) => {

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => onVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList