import anecdoteService from './../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

//const getId = () => (100000*Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.data.anecdote.id)
    const voted = store.find(a => a.id === action.data.anecdote.id)

    console.log(action.data.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.data.anecdote]
  }
  if (action.type === 'UPDATE') {
    return action.data.anecdotes
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

// export const anecdotesInitialization = (data) => {
//   return {
//     type: 'INIT_ANECDOTES',
//     data
//   }
// }

export const anecdotesInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const aneCreation = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: { anecdote }
    })
  }
}

export const voting = (anecdote) => {
  return async (dispatch) => {
    const ane = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: { anecdote }
    })
  }
}

export const aneUpdate = (anecdotes) => {
  return {
    type: 'UPDATE',
    data: { anecdotes }
  }
}


export default anecdoteReducer