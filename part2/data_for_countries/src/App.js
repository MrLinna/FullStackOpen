import {useState, useEffect} from 'react' 
import axios from 'axios'
import RenderCountryInfo from "./components/RenderCountryInfo"
import CountryForm from "./components/CountryForm"


const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect (() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleFilterChange =(event)=>{
    event.target.value ===0
    ? setCountriesToShow(countries)
    : setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return(
    <div>
      <CountryForm 
        handleFilterChange = {handleFilterChange}
      />
      <RenderCountryInfo countries={countriesToShow} setCountriesToShow = {setCountriesToShow}/>
    </div>
  )

}

export default App