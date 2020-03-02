import anecdoteService from './../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'UPVOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const upvote = (id) => ({type: 'UPVOTE', data: {id}})
export const createAnecdote = (anecdote) => ({type: 'NEW_ANECDOTE', data: anecdote})
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