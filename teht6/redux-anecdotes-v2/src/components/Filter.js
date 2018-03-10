import React from 'react'
import PropTypes from 'prop-types'
import { filterChange } from './../reducers/filterReducer'
import { aneUpdate } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {

    handleChange = (event) => {
      const anecdotes = this.props.anecdote
      this.props.filterChange(event.target.value, anecdotes)
      const anecdotes2 = this.props.filter
      this.props.aneUpdate(anecdotes2)

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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  aneUpdate,
  filterChange
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
) (Filter)


Filter.contextTypes = {
  store: PropTypes.object
}

export default ConnectedFilter