import axios from 'axios'
import { useState, useEffect } from 'react'
import Weather from './components/Weather'

const CountryInfo = ({countries}) => {
  const country = countries[0]
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map(key =>
        <li key={key}>{country.languages[key]}</li>)}
      </ul>
      <img src={country.flags.png} alt='flag'></img>
      <Weather country={country}/>
    </div>
  )
}

const CountryList = ({ countries, setCountries }) => {

  return (
    <div>
      {countries.map(country => 
        <div key={country.name.common}>
          {country.name.common}
          <button key={country.name.common} onClick={() => setCountries([country])}>
            show
          </button>
        </div>)
        
        }
    </div>
  )
}

const Countries = ({ countries, setCountries }) => {
  if(countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if(countries.length === 1 ) {
    return (
      <CountryInfo countries={countries} />
    )
  }

  return (
    <CountryList countries={countries} setCountries={setCountries}/>
  )
}

const Input = ({ value, onChange}) => {
  return (
    <>
      find countries <input
        value={value}
        onChange={onChange}
      />
    </>
  )
  }

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const updateFilter = (event) => {
    setFilter(event.target.value)
    setCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  return (
    <div>
      <Input value={filter} onChange={updateFilter}/>
      <Countries countries={countries} setCountries={setCountries}/>
    </div>
    )
}

export default App;
