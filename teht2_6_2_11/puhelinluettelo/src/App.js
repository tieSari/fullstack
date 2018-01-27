import React from 'react';

const Person = (props) =>
{
  return(
  <li>{props.person.name}</li>
  )
}

const Persons = (props) =>
{
  const {persons} = props
  const rivit = () => persons.map((person) => <Person key={person.id} person={person} />)
  return (
  <div>
  <ul>
   {rivit()}
   </ul>
  </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' , id: 0}
      ],
      newName: ''
    }
  }

addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    name: this.state.newName,
    id: this.state.persons.length + 1
  }

const persons = this.state.persons.concat(personObject)

  this.setState({
    persons: persons,
    newName: ''
  })
  }


handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
        <div>
  debug: {this.state.newName}
        </div>
          <div>
            nimi:  <input
            value={this.state.newPerson}
            onChange={this.handleNameChange}
          />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons persons={this.state.persons}/>
      </div>
    )
  }
}

export default App
