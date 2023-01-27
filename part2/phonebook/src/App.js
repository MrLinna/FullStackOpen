import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ContactService from './services/Contacts'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  // usestates
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState({msg: null, type: null})
  
  // effect hook to get data from server
  useEffect(()=>{
    ContactService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts)

      })
  },[])

  // add a new contact 
  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    // if the contact exists already
    const existsAlready = persons.filter(eachPerson => eachPerson.name === personObject.name)
    existsAlready.length > 0
      ? updateContact(personObject, existsAlready[0])
      : ContactService
        .create(personObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName("") 
          setNewNumber("")
          setNotificationMsg({msg:`Added ${personObject.name}`, type: "add"})
          removeNotification()
        })
        // added in exercise 3.19
        .catch(error => {
          console.log(error.response.data)
          setNotificationMsg({msg:`${error.response.data.error}`, type: "remove"})
          removeNotification()
        })
  }
  // update existing contact
  const updateContact=(personObject, oldContact)=>{
    if (window.confirm (`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
      ContactService
        .update(oldContact.id, personObject)
        .then((response) => {
          setPersons(persons.map(person => person.id !== oldContact.id ? person : response))
          setNewName("")
          setNewNumber("")
          setNotificationMsg({msg:`Updated ${personObject.name}`, type: "add"})
          removeNotification()
        })
        .catch(() => {
          handleError(personObject)//, "updateError")
        })
      }
  }
  // delete contact from server
  const deleteContact=(person)=>{
    if (window.confirm (`Delete ${person.name}?`)){
      ContactService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationMsg({msg:`removed ${person.name}`, type: "remove"})
          removeNotification()
        })
        .catch(() => {
          handleError(person)//, "deleteError")
        })
      }
  }
  // timeout to hide notifications
  const removeNotification = () => {
    setTimeout(() => {
      setNotificationMsg({msg: null, type: null})
    }, 5000)
  }
  const handleError =(person)=>{//, type
    //if (type === "deleteError"){
      setNotificationMsg({
        msg:`Information of '${person.name}' has already been removed from server`, 
        type: "remove"
      })
      removeNotification()
      setPersons(persons.filter(p => p.id !== person.id))
    /*}
    //  add new contact when one tries to update an already deleted contact
    if (type === "updateError"){
      ContactService
          .create(person)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName("") 
            setNewNumber("")
            setNotificationMsg({msg:`Updated ${person.name}`, type: "add"})
            removeNotification()
          })
    }*/
  
  }
  // handle events
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
      <Notification message={notificationMsg} />
      <Filter newFilter = {newFilter} handleNewFilter = {handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm 
        newName            = {newName} 
        newNumber          = {newNumber} 
        handleNameChange   = {handleNameChange} 
        handleNumberChange = {handleNumberChange} 
        addNumber          = {addContact} 
      />

      <h3>Numbers</h3>
      
      <Persons personsToShow = {personsToShow} deleteContact={deleteContact}/>

    </div>
  )
}

export default App