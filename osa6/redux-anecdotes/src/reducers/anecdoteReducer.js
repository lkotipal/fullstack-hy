import anecdoteService from './../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE':
      return state.map(anecdote => anecdote.id === action.data.id ? action.data : anecdote)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const upvote = (anecdote) => {
  return async dispatch => {
    const editedAnecdote = await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'UPDATE',
      data: editedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES', 
      data: anecdotes
    })
  }
}

export default reducer