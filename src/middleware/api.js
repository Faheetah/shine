const api = store => next => action => {
  if (typeof action === 'object' && typeof action.then === 'function') {
    return action.then(
      response => response.json()
    ).then(
      json => {
        if (json.length > 0 && json[0].hasOwnProperty('error')) {
          if(json[0]['error']['type'] === 1) {
            store.dispatch({ type: 'LOADING', loading: true })
          } else {
            store.dispatch({ type: 'ERROR', error: json[0]['error']['description'] })
          }
        } else {
          return json
        }
      }
    ).catch(
      error => {
        store.dispatch({ type: 'ERROR', error: 'Failed' })
      }
    )
  }
  return next(action)
}

export default api
