
const initialState = 'testinotifikaatio'

const notificationReducer = (store = initialState, action) => {
    console.log(action.data)
  if (action.type==='NOTIFIKAATIO') {
    return store
  }

  return store
}

export const notificationCreation = (content) => {
  return {
    type: 'NOTIFIKAATIO',
    data: { content }
  }
}



export default notificationReducer