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
  dispatch(fetch(`${endpoint}/lights/${id}/state`, {method: 'PUT', body: JSON.stringify({bri, on: +bri > 0})}))
}
