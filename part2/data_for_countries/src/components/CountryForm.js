const CountryForm=({handleFilterChange}) => {
    return(
      <form onSubmit={(event)=>event.preventDefault()}>
        find countries
        <input 
          onChange = {handleFilterChange}
        />
      </form>
    )
  }
export default CountryForm