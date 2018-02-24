import throttle from 'lodash/throttle'
// probably will be the middleware
const asdf = () => {
  store.subscribe(throttle(() => {
    saveState({
      auth: store.getState().auth,
    })
  }, 1000))
}
 
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
 
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
 
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}
