import React from 'react'

const LoginForm = ({ username, setUsername, password, setPassword, onSubmit }) => (
  <form onSubmit={onSubmit}>
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
)

export default LoginForm