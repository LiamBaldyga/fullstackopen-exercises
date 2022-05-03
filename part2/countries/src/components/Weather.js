import axios from 'axios'
import {useState, useEffect} from 'react'

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_WEATHER_API
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`
    
    useEffect(() => {
      axios
        .get(link)
        .then(response => {
          console.log('response')
          setWeather([response.data])
        })
    }, [])
  
    console.log(weather, weather.length)
    if (weather.length > 0) {
        const currentWeather = weather[0]
        return (
            <>
                <h1>Weather in {country.capital[0]}</h1>
                <div>temperature: {currentWeather.main.temp} fahrenheit</div>
                <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt='weather'></img>
                <div>wind: {currentWeather.wind.speed} miles/hour</div>
            </>
        )
    }
    return (
        <div></div>
    )
}

export default Weather