const initialState = {
  lights: {},
}

export default function lights(state = initialState, action) {
  switch (action.type) {
    case 'SET_LIGHTS':
      return Object.assign({}, state, {lights: action.lights})
    case 'SET_LIGHT_BRI':
      let {id, bri} = action
      return Object.assign({}, state, {
        [id]: Object.assign({}, state[id], {bri})
      })
    default:
      return state
  }
}
