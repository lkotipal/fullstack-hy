import React, { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const setCredentials = (event) => {
    event.preventDefault()

    login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={setCredentials}>
      <table><tbody>
        <tr>
          <td>username</td>
          <td><input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          /></td>
        </tr>
        <tr>
          <td>password</td>
          <td><input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          /></td>
        </tr>
      </tbody></table>
      <button type="submit">login</button>
    </form>
  )}

export default LoginForm