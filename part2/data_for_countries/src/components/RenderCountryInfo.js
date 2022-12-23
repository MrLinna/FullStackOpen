import OneCountryInfo from "./OneCountryInfo"
import Button from "./Button"
const RenderCountryInfo =({countries, setCountriesToShow}) => {
  const len = countries.length

  if (len === 0){
    return (<div>No matches, specify another filter</div>)
  }
  if (len > 10){
    return(<div>Too many matches, specify another filter</div>)
  }
  if( 1 < len && len <= 10){
    return(countries.map(country => 
                    <div key={country.name.common}>
                      {country.name.common}
                      <Button text="show" handleClick={()=>{setCountriesToShow([country])}}/>
                    </div>))
  }
  if( 1 === len ){
    return(<OneCountryInfo country = {countries[0]}/>)
  }
}
export default RenderCountryInfo