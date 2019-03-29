import fetch from 'isomorphic-fetch'

import _ from 'lodash'

export const setRooms = (rooms) => ({ type: 'SET_ROOMS', rooms: rooms })

export const getRooms = (endpoint) => (dispatch) => {
  dispatch(fetch(`${endpoint}/groups`))
    .then(
      response => dispatch(setRooms(response))
    )
}

const setBriApi = _.throttle((endpoint, id, payload, dispatch) => {
  dispatch(fetch(`${endpoint}/groups/${id}/action`, {method: 'PUT', body: JSON.stringify(payload)}))
}, 
1000, 
{leading: true, trailing: true})

export const setBri = (id, bri) => (dispatch, getState) => {
  const endpoint = getState().app.endpoint
  let room = getState().rooms.rooms[id]
  let payload = {transitiontime: 10, bri}

  if(bri === 0 && room.action.on) {
    payload = {transitiontime: 10, bri, on: false}
  }

  if(bri > 0 && !room.action.on) {
    payload = {transitiontime: 10, bri, on: true}
  }

  dispatch({type: 'SET_ROOM_STATE', id, bri, on: bri > 0})
  setBriApi(endpoint, id, payload, dispatch)
}

export const editRoomName = (id) => (dispatch, getState) => {
  let endpoint = getState().app.endpoint
  let name = prompt("New Name")
  if(!name) {
    return
  }

  dispatch(fetch(`${endpoint}/groups/${id}`, {method: 'PUT', body: JSON.stringify({name})}))
    .then(
      response => dispatch({ type: 'EDIT_ROOM_NAME', id, name })
    )
  
} 
