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


export default PersonForm