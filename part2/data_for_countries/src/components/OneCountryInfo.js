
import WeatherForm from "./WeatherForm"
const OneCountryInfo =({country}) => {
  console.log(country)
    const languages = country.languages
      ? Object.values(country.languages)
      : []
    const capital = country.capital
    return(
      <div>
        <h1>{country.name.common}</h1>
  
        <div>capital {capital}</div>
        <div>area {country.area}</div>
  
        <h2>languages:</h2>
        <ul>{languages.map(language => <li key = {language}>{language}</li>)}</ul>
        
        <img src={country.flags.png}/>
        <WeatherForm city = {capital}/>
      </div>
    )
  }
export default OneCountryInfo