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

export default Filter