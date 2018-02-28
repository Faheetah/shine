import fetch from 'isomorphic-fetch'

export const setRooms = (rooms) => ({ type: 'SET_ROOMS', rooms: rooms })

export const getRooms = (endpoint) => (dispatch) => {
  dispatch(fetch(`${endpoint}/groups`))
    .then(
      response => dispatch(setRooms(response))
    )
}

export const setBri = (id, bri) => (dispatch, getState) => {
  const endpoint = getState().app.endpoint
  dispatch({type: 'SET_ROOM_STATE', id, bri, on: bri > 0})
  dispatch(fetch(`${endpoint}/groups/${id}/action`, {method: 'PUT', body: JSON.stringify({bri, on: +bri > 0})}))
}
