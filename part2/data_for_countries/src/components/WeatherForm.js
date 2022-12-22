import axios from "axios"
import {useEffect, useState} from 'react' 
const WeatherForm =({city}) => {
    const [windSpeed, setWindSpeed] = useState("")
    const [temperature, setTemperature] = useState("")
    const [icon, setIcon] = useState("")
    
    const api_key = process.env.REACT_APP_API_KEY
        useEffect (() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
            .then(response => {
                setTemperature(response.data.main.temp)
                setWindSpeed(response.data.wind.speed)
                setIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
            })
        },[])
    return(
        <>
            <h2>Weather in {city}</h2>
            <div>{`temperature ${temperature} \xB0C`}</div>
            <img src={icon}/>
            <div>wind {windSpeed} m/s</div>

        </>
    )
}
export default WeatherForm