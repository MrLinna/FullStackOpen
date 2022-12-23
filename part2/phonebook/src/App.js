import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ContactService from './services/Contacts'



const App = () => {
  const [persons, setPersons] = useState([]) 
  // usestates
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  // effect hook to get data from server
  useEffect(()=>{
    ContactService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts)

      })
  },[])

  // events
  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const existsAlready = persons.filter(eachPerson => eachPerson.name === personObject.name)
    
    existsAlready.length > 0
      ? updateContact(personObject, existsAlready[0])
      : ContactService
        .create(personObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName("") 
          setNewNumber("")
        }) 
}

  const updateContact=(personObject, oldContact)=>{
    

    if (window.confirm (`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
      ContactService
        .update(oldContact.id, personObject)
        .then((response) => {
          setPersons(persons.map(person => person.id !== oldContact.id ? person : response))
          setNewName("")
          setNewNumber("")
        })
      }
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

  const deleteContact=(person)=>{
    if (window.confirm (`Delete ${person.name}?`)){
      ContactService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
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
      
      <Persons personsToShow = {personsToShow} deleteContact={deleteContact}/>

    </div>
  )
}

export default App