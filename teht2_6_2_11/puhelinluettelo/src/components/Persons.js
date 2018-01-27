import React from 'react';

const Person = (props) =>
{
  return(
  <li>{props.person.name} {props.person.number}</li>
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