import React from 'react'
import PropTypes from 'prop-types'
import { aneCreation } from './../reducers/anecdoteReducer'
import { notificationCreation ,notificationDeletion } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {



  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    console.log(content)
    e.target.anecdote.value = ''

   // const newAnecdote = await anecdoteService.createNew(content)
    this.props.aneCreation(content)

    this.props.notificationCreation('you added', content)
    setTimeout(() => {this.props.notificationDeletion()}, 5000)
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
