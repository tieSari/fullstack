import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        summa: 0
      }
    }
  
    klikHyva = () => {
      this.setState({
        hyva: this.state.hyva + 1,
        summa: this.state.summa + 1
      })
    }

    klikNeutraali = () => {
        this.setState({
          neutraali: this.state.neutraali + 1
        })
      }
  
    klikHuono = () => {
      this.setState({
        huono: this.state.huono + 1,
        summa: this.state.summa -1
      })
    }

    laskePositiiviset = () => {
        return (this.state.hyva/(this.state.huono + this.state.neutraali + this.state.hyva)) * 100
        
      }
  
    render() {
      return (
        <div>
            <div>
            <br/>
            <b><em> Anna palautetta</em></b>
            <br/><br/>
            </div>
    
          <div>
            <button onClick={this.klikHyva}>hyvä</button>
            <button onClick={this.klikNeutraali}>neutraali</button>
            <button onClick={this.klikHuono}>huono</button>
            <div>
            <br/><br/>
            <b><em> Statistiikkaa</em></b>
            </div>
            <br/>
            Hyvä {this.state.hyva}<br/>
            Neutraali {this.state.neutraali}<br/>
            Huono {this.state.huono}<br/>
            Keskiarvo {(this.state.summa / 3).toFixed(1)} <br/>
            Positiivisia {this.laskePositiiviset().toFixed(1)}  %

          </div>
        </div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
