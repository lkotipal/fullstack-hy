const notificationAtStart = ''
let timeoutID = null

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
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clear())
      timeoutID = null
    }, 1000 * timeout)
    dispatch({
      type: 'NOTIFY', 
      data: message
    })
  }
}
export const clear = () => ({type: 'CLEAR', data: ''})

export default reducer