import React from 'react';


class App extends React.Component {
  addAne = (event) => {
    event.preventDefault()
      console.log(event.target.ane.value)
    this.props.store.dispatch(
      {type: 'NEW_ANE', data: event.target.ane.value})
  
    event.target.ane.value = ''
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.props.store.dispatch( {type: 'NEW_VOTE', data: {anecdote}})}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAne}>
          <div><input name="ane"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App