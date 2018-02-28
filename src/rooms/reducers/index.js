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
      let {id, bri, on} = action

      return {
        ...state,
        rooms: {
          ...state.rooms,
        [id]: {
          ...state.rooms[id],
          action: {...state.rooms[id].action, bri, on} 
        }
        }
      }
    default:
      return state
  }
}
