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
      return {
        ...state,
        lights: {
          ...state.lights,
          [action.id]: {
            ...state.lights[action.id],
            // state:{} as a nested key, not the Redux state
            state: {...state.lights[action.id].state, bri: action.bri, on: action.on} 
          }
        }
      }
    case 'EDIT_LIGHT_NAME':
      return {
        ...state,
        lights: {
          ...state.lights,
          [action.id]: {
            ...state.lights[action.id],
            name: action.name
          }
        }
      }
    default:
      return state
  }
}
