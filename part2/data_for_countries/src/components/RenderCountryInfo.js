import OneCountryInfo from "./OneCountryInfo"
import Button from "./Button"
const RenderCountryInfo =({countries, setCountriesToShow}) => {
    const len = countries.length
    if (len === 0)
      return (<div>No countries to show</div>)
    if (len > 10)
      return(<div>Too many matches, specify another filter</div>)
  
    if( 1 < len && len <= 10)
      return(countries.map(eachCountry => 
                      <div key={eachCountry.name.common}>
                        {eachCountry.name.common}
                        <Button text="show" handleClick={()=>{setCountriesToShow([eachCountry])}}/>
                      </div>))
    if( 1 === len )
      return(<OneCountryInfo country = {countries[0]}/>)
  }

export default RenderCountryInfo