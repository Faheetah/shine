const initialState = {
  lights: {},
}

export default function lights(state = initialState, action) {
  switch (action.type) {
    case 'SET_LIGHTS':
      return {
        ...state, lights: action.lights
      }
    case 'SET_LIGHT_STATE':
      let {id, bri, on} = action

      return {
        ...state,
        lights: {
          ...state.lights,
        [id]: {
          ...state.lights[id],
          // state:{} as a nested key, not the Redux state
          state: {...state.lights[id].state, bri, on} 
        }
        }
      }
    default:
      return state
  }
}
