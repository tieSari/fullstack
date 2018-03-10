import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import anecdoteReducer, { anecdotesInitialization }  from './reducers/anecdoteReducer'
import notificationReducer  from './reducers/notificationReducer'
import filterReducer  from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(anecdotesInitialization(anecdotes))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))