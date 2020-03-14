import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer.js'
import {
  Link
} from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to='/'>blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to='/users'>users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user.name} logged in <Button onClick={handleLogout}>logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar