
const initialState = 'testinotifikaatio'

const notificationReducer = (store = initialState, action) => {
  console.log(action.data)
  if (action.type==='ADD') {
    console.log(store)
    return action.data.text + ' ' + action.data.content
  }

  if (action.type==='REMOVE') {
    console.log('remove')
    return null
  }

  if (action.type==='NOTIFY') {
    console.log(action.data.text)
    store = action.data.text
    setTimeout(() => {store = clear()}, action.data.time)
    console.log(store)
  }

  return store
}

function clear(){
  console.log('clear')
  return  null}

export const notify = (text, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      data: { text, time }
    })
  }

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