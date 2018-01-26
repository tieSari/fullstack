import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return(
    <div>
    <h1>{props.kurssi}</h1>
    </div>
    )
}

const Osa = (props) => {
    return(
    <div>
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
    )
}

const Kurssit = (props ) => {    
  const { kurssit } = props;
    const rivit = () => kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi}/>)
    return (
      <div>
        {rivit()}
      </div>
    )
}

const Kurssi = (props ) => {    
    return (
      <div>
        <Otsikko kurssi = {props.kurssi.nimi}/>
        <Sisalto osat = {props.kurssi.osat}/>
        <Yhteensa osat = {props.kurssi.osat}/>
      </div>
    )
}
const Sisalto = (props) => {
  const { osat } = props;
    const rivit = () => osat.map(osa => <Osa key={osa.id} osa={osa}/>)
    return (
      <div>
        {rivit()}
      </div>
    )
  }

const Yhteensa = (props) => {
  const tehtavat = props.osat.map(osa => osa.tehtavia)
  function getSum(total, num) {
    return total + num;
}
    return(
    <div>
  <p>yhteensä {tehtavat.reduce(getSum)} tehtävää</p>
  </div>
    )
}


const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  
    return (
      <div>
        <Kurssit kurssit={kurssit} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)