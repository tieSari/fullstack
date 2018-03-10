import React from 'react'
import PropTypes from 'prop-types'
import { aneCreation } from './../reducers/anecdoteReducer'
import { notificationCreation ,notificationDeletion } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {



  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.anecdote.value)
    this.props.aneCreation(e.target.anecdote.value)
    this.props.notificationCreation('you added', e.target.anecdote.value)
    this.props.notificationDeletion(5000)
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  aneCreation,
  notificationDeletion,
  notificationCreation
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
) (AnecdoteForm)

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default ConnectedAnecdoteForm
