import React from 'react'
import Button from './Button'

const Person = ({person, onDelete}) => (
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><Button text='delete' onClick={onDelete}/></td>
    </tr>
)

export default Person