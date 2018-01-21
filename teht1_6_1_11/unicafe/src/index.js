import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Statistic = ({text, state, mark}) => (

      <tr>
       <td> {text}</td> <td> {state} </td> <td> {mark} </td>
       </tr>
  )

  const Statistics = ({state, mark}) => (
    <div>
        <table>
        <Statistic text ={state.statTexts[0]} state = {state.hyva}/>
        <Statistic text ={state.statTexts[1]} state = {state.neutraali}/>
        <Statistic text ={state.statTexts[2]} state = {state.huono}/>
        <Statistic text ={state.statTexts[3]} state = {state.ka}/>
        <Statistic text ={state.statTexts[4]} state = {state.posit} mark = {'%'}/>
        </table>
  </div>
  )

const Title = ({text}) => (
    <div>
        <br/>
        <b><em> {text}</em></b>
        <br/><br/>
     </div>
)

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        summa: 0,
        statTexts: ["Hyvä","Neutraali","Huono","Keskiarvo","Positiivisia"],
        ka: 0,
        posit: 0,
        lkm: 0
      }
    }
  
    klikButton = (type, muutos, posit) => {
        return () =>  this.setState({
        [type]: this.state[type] + 1,
        summa: this.state.summa + muutos,
        lkm: this.state.lkm + 1,
        posit: (((this.state.hyva + posit)/(this.state.lkm + 1)) * 100).toFixed(1),
        ka: ((this.state.summa + muutos) / (this.state.lkm + 1)).toFixed(1)
      })
    }
  
    render() {
        const stats = () => {
            if (this.state.lkm === 0) {
              return (
                <div>
                  <em>Ei palautteita</em>
                </div>
              )
            }
            return (
                <Statistics
            state={this.state} />
            )
          }
          
      return (
        <div>
            <Title text={"Anna palautetta"}/>
          <Button
            handleClick={this.klikButton('hyva',1,1)}
            text="Hyvä"/>
          <Button
           handleClick={this.klikButton('neutraali',0,0)}
            text="Neutraali"/>
          <Button
            handleClick={this.klikButton('huono',-1,0)}
            text="Huono"/>
            <Title text={"Statistiikka"}/>
            <div>{stats()}</div>  
        </div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
