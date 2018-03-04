const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    pos:0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)

    const laskePos = (state) =>
    {
      if(state.bad+state.ok==0) return 100.0;
      const pos = (state.good/(state.bad+state.ok)*100).toFixed(1)
      return pos
    }
    switch (action.type) {
      case 'GOOD':
        return {...state, good: state.good + 1, pos: laskePos({...state, good: state.good + 1})}
      case 'OK':
        return {...state, ok: state.ok + 1, pos: laskePos({...state, ok: state.ok + 1}) }
      case 'BAD':
        return {...state, bad: state.bad + 1, pos: laskePos({...state, bad: state.bad + 1}) }
      case 'ZERO':
        return initialState
        case 'POS':
        return {...state, pos: laskePos(state) }
    }
    return state
  }
  
  export default counterReducer