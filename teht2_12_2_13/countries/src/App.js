import React from 'react';
import axios from 'axios';


const Country = (props) =>
{
  let text = ''
  const showCountryInfo = (event) => {
      event.preventDefault();
      console.log('showCountryInfo clicked')
      alert(`name:  ${props.country.name}\n capital: ${props.country.capital}\n population: ${props.country.population}`
      )
  }
  return(
  <div> 
  <a href="#" onClick={showCountryInfo}>{props.country.name} </a>
  </div>
  )
}

const CountryInfo = (props) =>
{
  return(
    <div>
      <h1>{props.country.name}</h1>
      capital:   {props.country.capital}<br/> 
      population:   {props.country.population}<br/>
      <img src={props.country.flag} alt="country flag" height="40" width="40"/>
    </div>
  )
}

const Countries = (props) =>
{
  const {countries} = props
  const rivit = () => countries.map((country) => 
    <Country key={country.name} country={country} />) 
      console.log('countryInfo: ' ,countries[0]) 
      return(
      <div>
         {countries.length === 1 ? 
      (
        <CountryInfo country={countries[0]} />
     )
      :
       (   
         <div>
         {rivit()}
        </div>
       )
       }
       </div>
    )
}

class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    countries: [],
    filter: ''
  }
  console.log('constructor')
}

   handleFilter = (event) => {

    console.log(event.target.value)
    this.setState({ 
      filter: event.target.value

       })
  }

componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }


  render() {

  const countriesToShow = this.state.countries.filter(country => country.name.toUpperCase().startsWith(this.state.filter.toUpperCase()))

    return (
      <div>
        <h2>Countries</h2>
        <div>
            find countries  <input
            value={this.state.filter}
            onChange={this.handleFilter}
          />
          </div>
    
    {countriesToShow.length > 10 ?
    (
      <div>
        too many matches, specify another filter
      </div>
    )
    :
    (
      <div>
        <Countries countries={countriesToShow}/>
      </div>
    )
    }
      </div>
    )
}
}

export default App
