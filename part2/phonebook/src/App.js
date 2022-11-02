import { useState, useEffect } from 'react'
import personService from './services/people'

const Notification = ({ message , errorBoxColor}) => {
  if (message === '') {
    return null
  }

  return (
    <div className='error' style={errorBoxColor}>
      {message}
    </div>
  )
}

const Persons = ({persons, handleDelete}) => {
   
    return(
      persons.map(person => 
      <p key={person.name} person={person}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
      </p>) 
)}
const Filter = (props) => {
  return(
    <div>
        filter shown with <input 
          value = {props.value}
          onChange = {props.onChange}
        />
      </div>
  )
}
const PersonForm = (props) => {
  return(
    <form onSubmit={props.onSubmit}>
        <div>
          name: <input 
            value = {props.valueName}
            onChange = {props.onChangeName}
          />
        </div>
        <div>number: <input 
          value = {props.valueNumber}
          onChange = {props.onChangeNumber}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
     </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorBoxColor, setErrorBoxColor] = useState({color: 'green'})
  useEffect(() => {
    personService
    .getAll()
    .then(initialNotes => {
          setPersons(initialNotes)
    })
  }, [])

  const phonebookFilter = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) === true)
  
  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find(person =>  person.name === newName ))
    {
      if(window.confirm(newName + ' is already added to phonebook,replace the old with a new one?'))
      {
        const person = persons.find(n => n.name === newName)
        const changedNumber = { ...person, number: newNumber }
      
        personService
          .update(person.id, changedNumber).then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
        setErrorBoxColor({color: 'green'})
        setErrorMessage(
            'Number changed of '+person.name
          )
          setTimeout(() => {
            setErrorMessage('')  
          }, 5000)
          })
          .catch(() => {
            setErrorBoxColor({color: 'red'})
            setErrorMessage(
              `Information of '${person.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
            setPersons(persons.filter(n => n.name !== person.name))
          })
        
      }
    }
    else{
      const newPerson={
        name: newName ,
        number: newNumber
      }
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
          
      })
      setErrorBoxColor({color: 'green'})
      setErrorMessage(
        'Added '+newPerson.name
      )
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      
    }
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
      personService
      .del(id)
      .then(() => {
        setPersons(persons.filter(p=>p.id !==id))
      })
    }
}

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorBoxColor={errorBoxColor}/>
      <Filter value = {searchTerm} onChange = {handleSearchChange}/>
      <h2>add a new </h2>
      <PersonForm 
            onSubmit={addPerson} 
            valueName = {newName}
            onChangeName = {handleNameChange}
            valueNumber = {newNumber}
            onChangeNumber = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={phonebookFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
