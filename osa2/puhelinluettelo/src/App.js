import React, { useState, useEffect} from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() => {
        personService
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name.match(new RegExp(newName, 'i')))) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            personService
                .create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} onChange={handleFilterChange}/>
            <h3>Add new contact</h3>
            <PersonForm onSubmit={addPerson}
                name={newName}
                onNameChange={handleNameChange}
                number={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons persons={persons.filter(person => person.name.match(new RegExp(filter, 'i')))}/>
    </div>
    )

}

export default App