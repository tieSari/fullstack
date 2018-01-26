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

const Kurssi = (props ) => {    
    return (
      <div>
        <Otsikko kurssi = {props.kurssi.nimi}/>
        <Sisalto osat = {props.kurssi.osat}/>
      </div>
    )
}
const Sisalto = (props) => {
  const { osat } = props;
    const rivit = () => osat.map(osa => <Osa osa={osa}/>)
    return (
      <div>
        {rivit()}
      </div>
    )
  }

const Yhteensa = (props) => {
    return(
    <div>
  <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
  </div>
    )
}


const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
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
    }
  
    return (
      <div>
        <Kurssi kurssi={kurssi} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)