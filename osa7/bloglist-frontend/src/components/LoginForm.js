import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant='primary' type='submit'>login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm