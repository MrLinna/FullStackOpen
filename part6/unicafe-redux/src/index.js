import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'
const store = createStore(counterReducer)

store.dispatch({
  type: 'DO_NOTHING',
  
})

store.dispatch({
  type: 'Good',
  payload: {
  }
})

const App = () => {
    const good = () => {
      store.dispatch({
        type: 'GOOD'
      })
    }
  
    return (
      <div>
        <button onClick={good}>good</button>
        <button>ok</button>
        <button>bad</button>
        <button>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>ok</div>
        <div>bad</div>
      </div>
    )
  }

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)