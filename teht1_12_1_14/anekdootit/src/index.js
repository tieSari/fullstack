import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  ) 

  const Title = ({text}) => (
    <div>
        <br/>
        <b><em> {text}</em></b>
        <br/><br/>
     </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0],
      maxVotes: 0,
      maxIndex: 0
    }
  }

  klikVote = () => {
      const addVote = (entry, index) => {
           if(index==this.state.selected) {return entry + 1} return entry}

    return () =>  this.setState({
    votes: this.state.votes.map(addVote),
    maxVotes: this.state.votes[this.state.selected] >= this.state.maxVotes ? this.state.votes[this.state.selected] +1: this.state.maxVotes,
    maxIndex: this.state.votes[this.state.selected] >= this.state.maxVotes ? this.state.selected : this.state.maxIndex
  })
}

klikNext = () => {
    return () =>  this.setState({
    selected: Math.floor((Math.random() * 6))
  })
}

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]} has {this.state.votes[this.state.selected]} votes
        <br/>
        <Button handleClick={this.klikVote()} text= {"vote"} />
        <Button handleClick={this.klikNext()} text= {"Next anecdote"} />
        <Title text={"Anecdote with most votes:"} />
        {this.props.anecdotes[this.state.maxIndex]} has {this.state.maxVotes} votes
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)