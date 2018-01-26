import React from 'react'

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
export default Kurssi