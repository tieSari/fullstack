
const initialState = []

const filterReducer = (store = initialState, action) => {
  if (action.type==='CHANGE') {
    console.log( action.data.anecdotes )
    store = action.data.anecdotes.filter( p => p.content.includes(action.data.filter))
    console.log(store)
    return store
  }

  return store
}

export const filterChange = (filter, anecdotes) => {
  return {
    type: 'CHANGE',
    data: { filter, anecdotes }
  }
}





export default filterReducer