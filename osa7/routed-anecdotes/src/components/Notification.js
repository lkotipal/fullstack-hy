import React from 'react'

const Notification = ({notification}) => {
  return notification ? <div>{notification}</div> : null
}

export default Notification