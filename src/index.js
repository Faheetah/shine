import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './app/components/App'
import RootReducer from './app/reducers'

const store = createStore(
    RootReducer,
    applyMiddleware(thunk)
  )

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
