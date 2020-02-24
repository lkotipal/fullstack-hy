import React from 'react'

const Button = ({ text, onAction }) => (
  <button onClick={onAction}>
    {text}
  </button>
)

export default Button