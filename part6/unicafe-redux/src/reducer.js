const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        const incrementedGood = {
          ...state,
          good: state.good + 1
        }
        return incrementedGood
      
      case 'OK':
        const incrementedNeutral = {
          ...state,
          ok: state.good + 1
        }
        return incrementedNeutral

      case 'BAD':
        const incrementedNegative ={
          ...state,
          bad: state.bad + 1
        }
        return incrementedNegative
      case 'ZERO':
        return initialState
        
      default: return state
    }
  
  }
  
  export default counterReducer