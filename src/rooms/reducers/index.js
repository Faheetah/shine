const initialState = {
  rooms: {},
}

export default function rooms(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROOMS':
      return {
        ...state, rooms: action.rooms
      }
    case 'SET_ROOM_STATE':
      return {
        ...state,
        rooms: {
          ...state.rooms,
        [action.id]: {
          ...state.rooms[action.id],
          state: {...state.rooms[action.id].state, any_on: action.on, all_on: action.on},
          action: {...state.rooms[action.id].action, bri: action.bri, on: action.on} 
        }
        }
      }
    case 'EDIT_ROOM_NAME':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.id]: {
            ...state.rooms[action.id],
            name: action.name
          }
        }
      }
    default:
      return state
  }
}
