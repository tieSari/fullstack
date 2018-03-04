const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    ka: 0,
    pos:0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        return {...state, good: state.good + 1, ka: (state.good - state.bad)}
      case 'OK':
        return {...state, ok: state.ok + 1, ka: (state.good - state.bad) }
      case 'BAD':
        return {...state, bad: state.bad + 1, ka: (state.good - state.bad) }
      case 'ZERO':
        return initialState
        case 'KA':
        return {...state, ka: (state.good - state.bad) }
    }
    return state
  }
  
  export default counterReducer