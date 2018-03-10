import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { anecdotesInitialization }  from './reducers/anecdoteReducer'

class App extends React.Component {
  componentDidMount =  () => {
    this.props.anecdotesInitialization()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter/>
        <AnecdoteList/>
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null,
  { anecdotesInitialization }
)(App)