import fetch from 'isomorphic-fetch'

export const setRetries = (retries) => ({type: 'DECREMENT_RETRIES', retries: retries})

export const requestHubs = () => ({ type: 'REQUEST_HUBS' })

export const setHubs = (hubs) => ({ type: 'RECIEVE_HUBS', hubs: hubs })

export const setFetching = (fetching) => ({ type: 'SET_FETCHING', fetching: fetching })

export const setEndpoint = (endpoint) => ({ type: 'SET_ENDPOINT', endpoint: endpoint })

export const setError = (error) => {
  return { type: 'ERROR', error: error }
}

export const getError = (payload) => dispatch => {
  if (payload.length === 0) {
    let error = 'Could not read from hue hub, please ensure the hub is reachable'
    dispatch(setError(error))
    return error
  }
  if (payload[0].hasOwnProperty('error')) {
    let error = payload[0]['error']['description']
    dispatch(setError(error))
    return error
  }
}

export const getEndpoint = ip => (dispatch, getState) => {
  let endpoint = `http://${ip}/api/`
  let body = '{"devicetype": "shine#web"}'
  fetch(endpoint, {method: 'POST', body: body})
    .then(
      response => response.json()
    )
    .then(
      json => {
        // @refactor don't rely on side effects
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
          // @todo set local storage
          dispatch(setRetries(0))
          dispatch(setFetching(false))
          dispatch(setEndpoint(`${endpoint}/${json[0]['success']['username']}`))
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
  // @todo local storage check
  // let endpoint = 'http://192.168.0.239/api/2DrvPOpGQIVN26J1vOvZGeEl9Zmtu1hEiFkwGHFX'
  let endpoint = ''
  if (endpoint) {
    return dispatch(setEndpoint(endpoint))
  }
  dispatch(getHubs())
}
