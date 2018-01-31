import React from 'react';
import personService from '../services/persons'

const Person = (props) =>
{

const deletePerson = (event) => {
  event.preventDefault()

if(window.confirm(`Poistetaanko ${props.person.name}`))
{
 personService.delet(props.person.id)
    .then(response => {
      console.log(response)
    })
  }
}

  return(
  <li>{props.person.name} {props.person.number}<button onClick={deletePerson}>Poista</button></li> 
  )
}

const Persons = (props) =>
{
  const {persons} = props
  const rivit = () => persons.map((person) => <Person key={person.name} person={person} />)
  return (
  <div>
  <ul>
   {rivit()}
   </ul>
  </div>
  )
}

export default Persons