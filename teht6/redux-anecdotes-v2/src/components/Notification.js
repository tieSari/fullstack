import React from 'react'
import PropTypes from 'prop-types'
import { notificationCreation } from './../reducers/notificationReducer'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.context.store.getState().notification}
      </div>
    )
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

export default Notification
