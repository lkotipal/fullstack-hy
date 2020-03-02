const notificationAtStart = 'Lol apua'

const reducer = (state = notificationAtStart, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    default:
      return state
  }
}

export default reducer