const initialState = {
  lights: {},
}

export default function lights(state = initialState, action) {
  switch (action.type) {
    case 'SET_LIGHTS':
      return {
        ...state, lights: action.lights
      }
    case 'SET_LIGHT_BRI':
      let {id, bri} = action

      return {
        ...state,
        lights: {
          ...state.lights,
        [id]: {
          ...state.lights[id],
          state: {'bri': bri} // state:{} as a nested key, not the Redux state
        }
        }
      }
    default:
      return state
  }
}
