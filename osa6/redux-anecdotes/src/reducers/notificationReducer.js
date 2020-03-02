const notificationAtStart = ''

const reducer = (state = notificationAtStart, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(clear())
    }, 1000 * timeout)
    dispatch({
      type: 'NOTIFY', 
      data: message
    })
  }
}
export const clear = () => ({type: 'CLEAR', data: ''})

export default reducer