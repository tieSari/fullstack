import React from 'react';
import Persons from './components/Persons'
import axios from 'axios'


class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
//    persons: [
 //     { name: 'Arto Hellas', number: '040-123456' },
 //     { name: 'Martti Tienari', number: '040-123456' },
 //     { name: 'Arto Järvinen', number: '040-123456' },
 //     { name: 'Lea Kutvonen', number: '040-123456' }
 //   ],
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
    id: this.state.persons.length + 1
  }
  const persons = this.state.persons.map((person) => person.name).includes(personObject.name) ? 
  this.state.persons : this.state.persons.concat(personObject)

  this.setState({
    persons: persons,
    newName: '',
    newNumber: ''
  })
  }

componentWillMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3002/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
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
