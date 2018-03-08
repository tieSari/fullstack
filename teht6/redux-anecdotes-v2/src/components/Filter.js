import React from 'react'
import PropTypes from 'prop-types'
import { filterChange } from './../reducers/filterReducer'
import { aneUpdate } from './../reducers/anecdoteReducer'

class Filter extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

    handleChange = (event) => {
      const anecdotes = this.context.store.getState().anecdote
      this.context.store.dispatch(filterChange(event.target.value, anecdotes))
      const anecdotes2 = this.context.store.getState().filter
      this.context.store.dispatch(aneUpdate(anecdotes2))

    }
    render() {
      const style = {
        marginBottom: 10
      }

      return (
        <div style={style}>
          filter <input  onChange={this.handleChange}/>
        </div>
      )
    }
}
Filter.contextTypes = {
  store: PropTypes.object
}

export default Filter