const notificationAtStart = ''

const reducer = (state = notificationAtStart, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NOTIFY':
      return action.data
    case 'EMPTY':
      return ''
    default:
      return state
  }
}

export const notify = (message) => ({type: 'NOTIFY', data: message})
export const empty = () => ({type: 'EMPTY', data: ''})

export default reducer