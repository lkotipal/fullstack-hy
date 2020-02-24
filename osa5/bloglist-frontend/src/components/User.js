import React from 'react'
import Button from './Button'

const User = ({ name, onLogout }) => (
  <div>
    Welcome back, {name} <Button text={'log out'} onAction={onLogout}/>
  </div>
)

export default User