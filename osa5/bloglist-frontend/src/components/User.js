import React from 'react'

const User = ({ name, onLogout }) => (
  <div>
    Welcome back, {name} <button id='logout-button' onClick={onLogout}>log out</button>
  </div>
)

export default User