import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const Statistiikka = () => {
  const palautteita = store.getState.sum
  console.log(palautteita)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{store.getState().ka}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)