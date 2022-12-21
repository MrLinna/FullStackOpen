import { useState } from 'react'
// form to filter persons to show
const Filter = ({newFilter, handleNewFilter})=>{
  return(
    <form onSubmit={(event) => {event.preventDefault()}}>
      <div>
          filter shown with: 
          <input 
            value = {newFilter}
            onChange = {handleNewFilter}
          />
      </div>
    </form>
  )
}
// form to add a new person
const PersonForm = ({addNumber, newName, handleNameChange, newNumber, handleNumberChange})=>{
  return(
    <form onSubmit={addNumber}>
      <div>
        name: 
        <input 
          value = {newName}
          onChange ={handleNameChange}
        />
      </div>
      number: 
        <input 
          value = {newNumber}
          onChange ={handleNumberChange}
        />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
// render persons list
const Persons =({personsToShow})=> personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  // usestates
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
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