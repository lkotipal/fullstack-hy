import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer.js'
import {
  Link
} from 'react-router-dom'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Link to='/'>blogs</Link> 
      <Link to='/users'>users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavBar