const initialState = {
  loading: true,
  error: false,
  endpoint: false,
  retries: 0,
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'ERROR':
      return Object.assign({}, state, {error: action.error})
    case 'LOADING':
      return Object.assign({}, state, {loading: action.loading})
    case 'SET_ENDPOINT':
      return Object.assign({}, state, {endpoint: action.endpoint})
    case 'SET_RETRIES':
      return Object.assign({}, state, {retries: action.retries})
    case 'DECREMENT_RETRIES':
      return Object.assign({}, state, {retries: state.retries - 1})
    default:
      return state
  }
}
