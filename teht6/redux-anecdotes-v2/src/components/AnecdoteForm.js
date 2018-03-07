import React from 'react'
import PropTypes from 'prop-types'
import { aneCreation } from './../reducers/anecdoteReducer'
import { notificationCreation ,notificationDeletion } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.anecdote.value)
    this.context.store.dispatch(aneCreation(e.target.anecdote.value))
    this.context.store.dispatch(notificationCreation('you added', e.target.anecdote.value))
    console.log(this.context.store.getState())
    this.context.store.dispatch(notificationDeletion(5000))
    e.target.anecdote.value = ''
  }


  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
