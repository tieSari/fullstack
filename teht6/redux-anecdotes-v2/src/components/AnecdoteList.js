import React from 'react'
import PropTypes from 'prop-types'
import { voting } from './../reducers/anecdoteReducer'
import { filterChange } from './../reducers/filterReducer'
import { notificationCreation ,notificationDeletion } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const anecdotes = this.context.store.getState().anecdote
   // const anecdotes = this.context.store.getState().filter
    console.log(anecdotes[0])
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.context.store.dispatch(voting(anecdote.id))
                this.context.store.dispatch(notificationCreation('you voted ' ,anecdote.content))
                this.context.store.dispatch(notificationDeletion(5000))
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
