import React ,  { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './components/countrydetails'

const Filter = (props) => {
  return(
    <div>
        find countries <input 
          value = {props.value}
          onChange = {props.onChange}
        />
      </div>
  )
}



const Countries = ({countries , showCountry , handleShowCountry , weather , setWeather}) => {
  
  if(countries.length > 10)
  {
    
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  if(countries.length === 1)
  {
    return(
      <>
         <CountryDetails countries={countries} weather={weather} setWeather={setWeather}/>
      </>
      
    )
    
  }
  return(
    <>
      {countries.map(country => 
      <p key={country.name.common} country={country}>
      {country.name.common}
      {' '}<button onClick={()=>handleShowCountry(country.name.common)}>show</button>  
      </p>)
      } 
      <CountryDetails countries={showCountry} weather={weather} setWeather={setWeather}/>
    </>
  )
  
}





const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCountry, setShowCountry] = useState([])
  const [weather, setWeather] = useState([])
  const handleShowCountry = (name)=>{
    
    setShowCountry(
      countries.filter(country => 
        country.name.common === name)
    )
    
  }
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  const countriesFilter = (searchTerm === '') ? [] : 
  countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) === true)
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setShowCountry([])
  }
  return (
    <div>
      <Filter value = {searchTerm} onChange = {handleSearchChange}/>
      <Countries countries={countriesFilter} showCountry={showCountry} handleShowCountry={handleShowCountry}
                  weather={weather} setWeather={setWeather}
      />
    </div>
  )
}

export default App 