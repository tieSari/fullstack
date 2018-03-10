
const initialState = 'testinotifikaatio'

const notificationReducer = (store = initialState, action) => {
  console.log(action.data)
  if (action.type==='ADD') {
    console.log(store)
    return action.data.text + ' ' + action.data.content
  }

  if (action.type==='REMOVE') {
    return null
  }

  return store
}

export const notificationCreation = (text, content) => {
  return {
    type: 'ADD',
    data: { text,content }
  }
}

export const notificationDeletion = () => {
  return {
    type: 'REMOVE',
    data: { }
  }
}



export default notificationReducer