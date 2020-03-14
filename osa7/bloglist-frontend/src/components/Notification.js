import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) {
    return null
  }

  let variant = 'primary'
  switch (notification.type) {
  case 'success':
    variant = 'success'
    break
  case 'error':
    variant='danger'
    break
  }

  return <Alert variant={variant}>
    {notification.message}
  </Alert>
}

export default Notification