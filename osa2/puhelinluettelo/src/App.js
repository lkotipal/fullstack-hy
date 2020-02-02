import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

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

  const notify = (message, error) => {
    setNotification(message)
    setError(error)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleDelete = (id) => {
    const toBeDeleted = persons.filter(person => person.id === id)
    if (toBeDeleted.length === 1) {
      if(window.confirm(`Delete ${toBeDeleted[0].name}?`)) {
        personService
          .remove(id)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id))
            notify(`${toBeDeleted[0].name} removed!`, false)
          }).catch((error) => {
            setPersons(persons.filter(person => person.id !== id))
            notify(`Failed to remove ${toBeDeleted[0].name}!`, true)
          })
      }
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`Overwrite ${newName}?`)) {
        const person = persons.find(person => person.name === newName)
        const id = person.id
        const changedPerson = {
          ...person,
          number: newNumber
        }

        personService
          .update(id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id === id ? returnedPerson : p))
              notify(`${person.name} updated!`, false)
            }).catch((error) => {
              setPersons(persons.filter(person => person.id !== id))
              notify(`Failed to update ${person.name}!`, true)
            })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          notify(`${newPerson.name} added!`, false)
        }).catch((error) => {
          notify(`Failed to add ${newPerson.name}!`, true)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add new contact</h3>
      <PersonForm onSubmit={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons.filter(person => person.name.match(new RegExp(filter, 'i')))}
        onDelete={handleDelete}
      />
      <Notification message={notification} error={error}/>
    </div>
  )

}

export default App