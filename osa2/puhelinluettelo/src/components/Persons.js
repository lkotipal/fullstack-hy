import React from 'react'
import Person from './Person'

const Persons = ({persons, onDelete}) => (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Number</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {persons.map(person => <Person 
                key={person.id} 
                person={person}
                onDelete={() => onDelete(person.id)}
            />)}
        </tbody>
    </table>
)

export default Persons