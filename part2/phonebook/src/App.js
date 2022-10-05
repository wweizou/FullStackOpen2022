import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
        .then(res=>setPersons(res.data))
  },[])

  const peopleToShow = persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    if (persons.some(person=>person.name===newName)){
      alert(`${newName} is already added to the phonebook`)
      return 
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} addNote={addNote} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} />
    </div>
  )
  

}

export default App
