const initialState = {
  fetching: true,
  retries: 30,
  endpoint: false,
  error: false,
  hubs: []
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_HUBS':
      return Object.assign({}, state, {fetching: true})
    case 'RECIEVE_HUBS':
      return Object.assign({}, state, {hubs: action.hubs})
    case 'SET_ENDPOINT':
      return Object.assign({}, state, {endpoint: action.endpoint})
    case 'ERROR':
      return Object.assign({}, state, {error: action.error})
    case 'SET_FETCHING':
      return Object.assign({}, state, {fetching: action.fetching})
    case 'DECREMENT_RETRIES':
      return Object.assign({}, state, {retries: action.retries})
    case 'RESET':
      return Object.assign({}, state, initialState)
    default:
      return state
  }
}

export default AuthReducer
