const notificationAtStart = null
let timeoutID = null

const reducer = (state = notificationAtStart, action) => {
  console.log(action.data)
  switch(action.type) {
  case 'NOTIFY':
    return action.data
  case 'CLEAR':
    return notificationAtStart
  default:
    return state
  }
}

export const setNotification = (message, type, timeout) => {
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
      data: {
        message,
        type
      }
    })
  }
}
export const clear = () => ({ type: 'CLEAR', data: {} })

export default reducer