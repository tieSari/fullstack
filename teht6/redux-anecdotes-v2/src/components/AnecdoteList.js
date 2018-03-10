import React from 'react'
import PropTypes from 'prop-types'
import { voting } from './../reducers/anecdoteReducer'
import { filterChange } from './../reducers/filterReducer'
import { notificationCreation ,notificationDeletion } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {


  render() {
    const anecdotes = this.props.anecdote
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
                this.props.voting(anecdote.id)
                this.props.notificationCreation('you voted ' ,anecdote.content)
                setTimeout(() => {this.props.notificationDeletion()}, 5000)
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote
  }
}

const mapDispatchToProps = {
  voting,
  notificationDeletion,
  notificationCreation
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
) (AnecdoteList)

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default ConnectedAnecdoteList
