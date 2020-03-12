import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import User from './User'

const Users = () => {
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match ? users.find(user => user.id === match.params.id) : null

  return (
    <Router>
      <Switch>
        <Route path='/users/:id'>
          {user && <User user={user}/>}
        </Route>
        <Route path='/users'>
          <h2>Users</h2>
          <table>
            <thead><tr>
              <td>user</td>
              <td>blogs created</td>
            </tr></thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Route>
      </Switch>
    </Router>
  )
}

export default Users