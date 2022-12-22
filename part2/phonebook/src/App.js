import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  // usestates
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  // effect hook to get data from server
  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  // events
  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.filter(eachPerson => eachPerson.name === personObject.name).length > 0
    ? alert(`${newName} is already added to phonebook`)
    : setPersons(persons.concat(personObject))
  
    setNewName("") 
    setNewNumber("") 
  }

  const handleNameChange =(event)=>{
    setNewName(event.target.value)
  }
  
  const handleNumberChange =(event)=>{
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange =(event)=>{
    setNewFilter(event.target.value)

  }

  const personsToShow = 
          newFilter.length === 0
          ? persons
          : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter = {newFilter} handleNewFilter = {handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm 
        newName            = {newName} 
        newNumber          = {newNumber} 
        handleNameChange   = {handleNameChange} 
        handleNumberChange = {handleNumberChange} 
        addNumber          = {addNumber} 
      />

      <h3>Numbers</h3>
      
      <Persons personsToShow = {personsToShow}/>
    </div>
  )
}

export default App