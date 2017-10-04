import { combineReducers } from 'redux'

import auth from './auth'
import lights from '../../lights/reducers'

const RootReducer = combineReducers({
  auth,
  lights
})

export default RootReducer
