import React from 'react';
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'


class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    persons: [],
    newName: '',
    newNumber: '',
    filter: ''
  }
}
handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

   handleFilter = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

addPerson = (event) => {
  event.preventDefault()

  const personObject = {
    name: this.state.newName,
    number: this.state.newNumber,
  }
  if(!this.state.persons.map((person) => person.name).includes(personObject.name))
  {
 personService.create(personObject)
    .then(response => {
      console.log(response)
        this.setState({
    persons: this.state.persons.concat(response),
    newName: '',
    newNumber: ''
  })
    })
  }
  }

componentWillMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response })
      })
  }


  render() {

  const personsToShow = this.state.persons.filter(person => person.name.toUpperCase().startsWith(this.state.filter.toUpperCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
            rajaa näytettäviä  <input
            value={this.state.filter}
            onChange={this.handleFilter}
          />
          </div>
        <form onSubmit={this.addPerson}>
          <div>
            nimi:  <input
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          </div>
          <div>
            numero:  <input
            value={this.state.newNumber}
            onChange={this.handleNumberChange}
          />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
        <Persons persons={personsToShow}/>
      </div>
      </div>
    )
  }
}

export default App
