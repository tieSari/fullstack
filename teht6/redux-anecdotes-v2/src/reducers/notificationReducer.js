
const initialState = 'testinotifikaatio'

const notificationReducer = (store = initialState, action) => {
  console.log(action.data)
  if (action.type==='ADD') {
    store = action.data.text + ' ' + action.data.content
    console.log(store)
    return store
  }

  if (action.type==='DELETE') {
    setTimeout(() => store = '', action.data.time)
    return store
  }

  return store
}

export const notificationCreation = (text, content) => {
  return {
    type: 'ADD',
    data: { text,content }
  }
}

export const notificationDeletion = (time) => {
  return {
    type: 'REMOVE',
    data: { time }
  }
}



export default notificationReducer