import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// const newText = (anecdotes) =>
// {setTimeout(() =>
//     {
//       anecdotes.filter(a => a.info === 'new').map(a => <h3>{a.content}</h3>)
//       }, 3000)}

const newText =  (anecdotes) =>
{
  return anecdotes.filter(a => a.info === 'new').map(a => 'uusi anecdootti: ' +a.content)
}

const notificationStyle = {
  color: 'green',
  fontStyle: 'bold',
  fontSize: 16,
  border: 1,
  borderStyle: 'solid',
  padding: 5,
  margin: 2
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    
    <div>
    <Notification message= {newText(anecdotes)}></Notification>
    </div>
    

    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
      <Link to={`/${anecdote.id}`}>{anecdote.content}</Link></li>
      )}
    </ul>  
  </div>
)

const Anecdote = ({anecdote}) => (
    <div>
    <h2>{anecdote.content}</h2>
    <div>
      has {anecdote.votes} votes
    </div>  
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: 'new'
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    console.log(this.props.history)
    this.props.history.push({pathname:'/anecdotes', state: {message: "hello, im a passed message!"}})

  }


  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }


  render() {

console.log(this.props)
   //    <h2>{this.props.history.state.message}</h2>
    return (
      <div>
        <Router>
          <div>
            <div>
            <Link to="/">home</Link> &nbsp;
              <Link to="/anecdotes">anecdotes</Link> &nbsp;
              <Link to="/create">create new</Link> &nbsp;
              <Link to="/about">about</Link>
            </div>
             <h1>Software anecdotes</h1>
            <Route exact path="/anecdotes" render={({history}) => <AnecdoteList history={history} anecdotes={this.state.anecdotes} />} />
                  <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
      />
            <Route path="/create" render={({history}) => <CreateNew history={history} addNew = {this.addNew} />} />
            <Route path="/about" render={() => <About />} />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App;
