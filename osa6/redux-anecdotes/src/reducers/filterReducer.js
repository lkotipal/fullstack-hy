const filterAtStart = ''

const reducer = (state = filterAtStart, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (filter) => ({type: 'SET_FILTER', data: filter})

export default reducer