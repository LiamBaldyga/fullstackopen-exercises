import { useEffect, useState } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  const goodMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStlye: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const badMessage = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStlye: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  if(message.includes('removed') || message.includes('failed')) {
    return (
      <div className='message' style={badMessage}>
        {message}
      </div>
    )
  }

  return (
    <div className='message' style={goodMessage}>
      {message}
    </div>
  )
}

const Filter = ({ filter,setFilter, setShowFilter }) => {
  const updateFilter = (event) => {
    setShowFilter(event.target.value.length > 0 ? false : true)
    setFilter(event.target.value)
  }

  return (
  <>
    filter shown with <input 
    value={filter}
    onChange={updateFilter}
    />
  </>
  )
}

const PersonForm = ({newName, newNumber, persons, setPersons, setNewName, setNewNum, setMessage}) => {
  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const inPhonebook = persons.find(person => person.name === newName)
    if( inPhonebook && inPhonebook.number !== newNumber && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(inPhonebook.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== inPhonebook.id ? person : returnedPerson))
          setNewName('')
          setNewNum('')
        })
        .catch((error) => {
          setMessage(
            `Person '${inPhonebook.name}' was already removed from the server`
          )
          setPersons(persons.filter(person => person.id !== inPhonebook.id))
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }

    else if(inPhonebook){
      alert(`${inPhonebook} is already added to phonebook`)
    }
    
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
          setMessage(
            `${newName} was successfully added`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch(error => {
          setMessage(
            error.response.data.error
          )
          setNewName('')
          setNewNum('')
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }


  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({personsToShow, setPersons, persons}) => {
  const deleteP = (person) => {
    if(window.confirm(`do you really want to delete ${person.name}?`)) {
      personService.deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  } 

  return (
    <>
      {personsToShow.map(person =>
        <div key={person.name}>
          {person.name} &nbsp;
          {person.number}
          <button type='button' onClick={() => deleteP(person)}>delete</button>
          </div>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [showFilter, setShowFilter] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  },[])

  const personsToShow = showFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} setShowFilter={setShowFilter}/>
      <h2>add new</h2>
      <PersonForm setMessage={setMessage} newName={newName} newNumber={newNumber} persons={persons} setPersons={setPersons} setNewName={setNewName} setNewNum={setNewNum} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App