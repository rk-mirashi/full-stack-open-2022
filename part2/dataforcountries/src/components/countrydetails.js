import React , { useEffect } from 'react'
import axios from 'axios'


const CountryDetails = ({countries , weather , setWeather}) => {
  const city = countries.map(country => country.capital[0])[0] ? 
      countries.map(country => country.capital[0])[0] 
      : 'London'  
  useEffect(() => {
      
      
      axios
        .get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&APPID='+process.env.REACT_APP_API_KEY)
        .then(response => {

          setWeather(response.data)
          

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[city])
    
    //console.log('Weather'+weather);
    return(

      countries.map(country => 
        <div key={country.name.common} country={country}>
          <h1>{country.name.common} </h1>
          <p>
            capital {country.capital}<br/>
            area {country.area}
          </p>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} alt="$(country.name.common) Flag"/>
          <h1>Weather in {weather.name}</h1>
          <p>
            temperature {weather.main.temp} Celsius <br/>
          <img src={'http://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'} alt = {weather.weather.main}/><br/>
            wind {weather.wind.speed} m/s
          </p>
        </div>
        )
      
       
  ) 
  }

  export default CountryDetails