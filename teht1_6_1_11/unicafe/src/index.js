import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Statistic = ({text, state}) => (

      <div>
        {text} {state}
    </div>
  )

  const Statistics = ({state}) => (
    <div>
        <Statistic text ={state.statTexts[0]} state = {state.hyva}/>
        <Statistic text ={state.statTexts[1]} state = {state.neutraali}/>
        <Statistic text ={state.statTexts[2]} state = {state.huono}/>
        <Statistic text ={state.statTexts[3]} state = {state.ka}/>
        <Statistic text ={state.statTexts[4]} state = {state.posit}/>
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
  
    klikHyva = () => {
        return () =>  this.setState({
        hyva: this.state.hyva + 1,
        summa: this.state.summa + 1,
        lkm: this.state.lkm + 1,
        posit: (((this.state.hyva + 1)/(this.state.lkm + 1)) * 100).toFixed(1),
        ka: ((this.state.summa + 1) / (this.state.lkm + 1)).toFixed(1)
      })
    }

    klikNeutraali = () => {
        return () => this.setState({
          neutraali: this.state.neutraali + 1,
          lkm: this.state.lkm + 1,
          posit: (((this.state.hyva)/(this.state.lkm + 1)) * 100).toFixed(1),
          ka: ((this.state.summa) / (this.state.lkm + 1)).toFixed(1)
        })
      }
  
    klikHuono = () => {
      return () => this.setState({
        huono: this.state.huono + 1,
        summa: this.state.summa -1,
        lkm: this.state.lkm + 1,
        posit: (((this.state.hyva)/(this.state.lkm + 1)) * 100).toFixed(1),
        ka: ((this.state.summa - 1) / (this.state.lkm + 1)).toFixed(1)
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
            handleClick={this.klikHyva()}
            text="Hyvä"/>
          <Button
            handleClick={this.klikNeutraali()}
            text="Neutraali"/>
          <Button
            handleClick={this.klikHuono()}
            text="Huono"/>
            <Title text={"Statistiikka"}/>
            <div>{stats()}</div>  
        </div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
