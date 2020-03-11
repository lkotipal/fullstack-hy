const notificationAtStart = null

const reducer = (state = notificationAtStart, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return notificationAtStart
  default:
    return state
  }
}

let timeoutID = null

export const setNotification = (message, type = 'success', timeout = 10) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        message,
        type
      }
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(clear())
      timeoutID = null
    }, 1000 * timeout)
  }
}
export const clear = () => ({ type: 'CLEAR_NOTIFICATION', data: {} })

export default reducer