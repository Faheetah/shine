import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const setLights = (lights) => ({ type: 'SET_LIGHTS', lights: lights })

export const getLights = (endpoint) => (dispatch) => {
  dispatch(fetch(endpoint + '/lights')).then(
    response => {
      dispatch(setLights(response))
    }
  )
}

export const setBri = (id, bri) =>  {
  dispatch({type: 'SET_LIGHT_BRI', id:4, bri})
}
