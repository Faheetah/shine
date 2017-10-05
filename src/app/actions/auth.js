import fetch from 'isomorphic-fetch'

export const setRetries = (retries) => ({type: 'DECREMENT_RETRIES', retries: retries})

export const requestHubs = () => ({ type: 'REQUEST_HUBS' })

export const setHubs = (hubs) => ({ type: 'RECIEVE_HUBS', hubs: hubs })

export const setFetching = (fetching) => ({ type: 'SET_FETCHING', fetching: fetching })

export const setEndpoint = (endpoint) => {
  localStorage.setItem('auth.endpoint', endpoint)
  return { type: 'SET_ENDPOINT', endpoint: endpoint }
}

export const reset = () => dispatch => {
  localStorage.removeItem('auth.endpoint')
  dispatch({ type: 'RESET' })
  dispatch(authenticate())
}

export const clearEndpoint = () => {
  localStorage.removeItem('auth.endpoint')
  return { type: 'SET_ENDPOINT', endpoint: undefined }
}

export const setError = (error) => {
  return { type: 'ERROR', error: error }
}

export const getEndpoint = ip => (dispatch, getState) => {
  let url = `http://${ip}/api/`
  let body = '{"devicetype": "shine#web"}'
  fetch(url, {method: 'POST', body: body})
    .then(
      response => response.json()
    )
    .then(
      json => {
        let state = getState()

        if (json[0].hasOwnProperty('error')) {
          if (json[0]['error']['type'] === 101 && state.auth.retries > 0) {
            dispatch(setRetries(state.auth.retries - 1))
            dispatch(setError('Please press the link button'))
            setTimeout(() => dispatch(getEndpoint(ip)), 2000)
          } else {
            dispatch(setError(json[0]['error']['description']))
          }
        } else {
          dispatch(setRetries(0))
          dispatch(setFetching(false))
          dispatch(setEndpoint(`${url}/${json[0]['success']['username']}`))
          dispatch(setError(false))
        }
      },
      error => {
        dispatch(setError(error.message))
      }
    )
} 

export const recieveHubs = hubs => {
  return dispatch => {
    dispatch(setHubs(hubs))
    if (hubs.length === 1) {
      dispatch(getEndpoint(hubs[0]['internalipaddress']))
    }
  } 
}

export const getHubs = () => dispatch => {
  dispatch(requestHubs())

  return fetch('https://www.meethue.com/api/nupnp')
    .then(
      response => response.json()
    )
    .then(
      json => dispatch(recieveHubs(json)),
      error => dispatch(setError(error.message))
    )
}

export const authenticate = () => (dispatch, getState) => {
  let endpoint = localStorage.getItem('auth.endpoint')

  if (endpoint) {
    dispatch(setEndpoint(endpoint))
    dispatch(setFetching(false))
  } else {
    dispatch(getHubs())
  }
}
