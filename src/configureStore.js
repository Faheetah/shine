import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import app from './app/reducers'
import lights from './lights/reducers'
import rooms from './rooms/reducers'

import api from './middleware/api'

const RootReducer = combineReducers({
  app,
  lights,
  rooms,
})

const configureStore = () => {
  const store = createStore(
    RootReducer, 
    composeWithDevTools(applyMiddleware(api, thunk))
  )
 
  return store
}

export default configureStore
