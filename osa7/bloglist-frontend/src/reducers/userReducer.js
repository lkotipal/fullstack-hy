import loginService from './../services/login'
import storage from './../utils/storage'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'SETUSER':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    storage.saveUser(user)
    dispatch({
      type: 'SETUSER',
      data: user
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    dispatch({
      type: 'SETUSER',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default reducer