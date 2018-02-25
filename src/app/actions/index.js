import fetch from 'isomorphic-fetch'

export const setError = (error) => ({ type: 'ERROR', error })
export const setLoading = (loading) => ({ type: 'LOADING', loading })
export const setRetries = (retries) => ({ type: 'SET_RETRIES', retries })
export const decrementRetries = () => ({ type: 'DECREMENT_RETRIES' })
export const setEndpoint = (endpoint) => ({ type: 'SET_ENDPOINT', endpoint })

export const linkLight = () => (dispatch) => {
  let endpoint = 'http://192.168.1.12/api/oTOeUZMGJrqJdB4hQiFYeA3-mZ-WjQgsCkByvggX/config'

  return fetch(endpoint, { method: 'PUT', body: '{"linkbutton":true}' })
    .then(
      response => response.json()
    )
    .then(
      json => {
        if (json[0].hasOwnProperty('error')) {
          dispatch(setError(json[0]['error']['description']))
        } else {
          dispatch(setError('Link light active'))
          setTimeout(() => dispatch(setError()), 30000)
        }
      },
      error => dispatch(setError(error))
    )
}

export const authenticate = (hub) => (dispatch, getState) => {
  const retries = getState().app.retries

  if(retries <= 0) {
    return dispatch(setError('out of retries, please refresh'))
  }

  dispatch(decrementRetries())

  const body = JSON.stringify({"devicetype": "shine_web#user"})
  fetch(`http://${hub}/api`, { method: 'POST', body: body })
    .then(
      response => response.json()
    )
    .then(
      json => {
        if(json.length > 0 && json[0].hasOwnProperty('error')) {
          if(json[0]['error']['type'] === 101) {
            setTimeout(() => dispatch(authenticate(hub)), 1000)
          } else {
            dispatch(setError(json[0]['error']['description']))
          }
        } else {
          if(json.length === 1 && json[0].hasOwnProperty('success') && json[0]['success'].hasOwnProperty('username')) {
            dispatch(setRetries(0))
            let user = json[0]['success']['username']
            let endpoint = `http://${hub}/api/${user}`
            dispatch(setEndpoint(endpoint))
            dispatch(setLoading(false))
          } else {
            dispatch(setError(`unparsable response ${JSON.stringify(json)}`))
          }
        }
      },
      error => {
        dispatch(setError(error))
      }
    )
}

export const findEndpoint = () => (dispatch) => {
  fetch('https://www.meethue.com/api/nupnp')
    .then(
      response => response.json()
    )
    .then(
      json => {
        if(json.length === 1 && json[0].hasOwnProperty('internalipaddress')) {
          dispatch(setRetries(120))
          dispatch(authenticate(json[0]['internalipaddress']))
        } else {
          dispatch(setError('Could not find a hub, got ' + JSON.stringify(json)))
        }
      },
      error => dispatch(setError(error))
    )
}
