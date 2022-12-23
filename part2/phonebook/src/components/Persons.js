import Button from "./Button"
// render persons list
const Persons =({personsToShow, deleteContact})=> {
    return(
        personsToShow.map(person => 
            <p key={person.id}>
                {person.name} {person.number} <Button text={"delete"} handleClick={()=>deleteContact(person)}/>
            </p>
        )
    )
  }

export default Persons