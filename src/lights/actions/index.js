import fetch from 'isomorphic-fetch'

export const setLights = (lights) => ({ type: 'SET_LIGHTS', lights: lights })

export const getLights = (endpoint) => (dispatch) => {
  dispatch(fetch(`${endpoint}/lights`))
    .then(
      response => dispatch(setLights(response))
    )
}

export const setBri = (id, bri) => (dispatch, getState) => {
  const endpoint = getState().app.endpoint
  dispatch({type: 'SET_LIGHT_STATE', id, bri, on: bri > 0})
  dispatch(fetch(`${endpoint}/lights/${id}/state`, {method: 'PUT', body: JSON.stringify({transitiontime: 1, bri, on: +bri > 0})}))
}

export const editLightName = (id) => (dispatch, getState) => {
  let endpoint = getState().app.endpoint
  let name = prompt("New Name")
  if(!name) {
    return
  }

  dispatch(fetch(`${endpoint}/lights/${id}`, {method: 'PUT', body: JSON.stringify({name})}))
    .then(
      response => dispatch({ type: 'EDIT_LIGHT_NAME', id, name })
    )
  
} 
