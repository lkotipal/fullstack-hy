import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      // dispatch(setNotification(`${user.name} welcome back!`))
      // Fix in post
      dispatch(setNotification(`${username} welcome back!`))
    } catch(exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }


  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login'>login</button>
    </form>
  )
}

export default LoginForm