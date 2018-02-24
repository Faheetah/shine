import React from 'react'

import Light from './Light'

const LightList = ({lights}) => {
  return (
    <ul>
      {Object.keys(lights).map((light, i) => 
        <Light key={i} light={lights[light]} id={light} />
      )}
    </ul>
  )
}

export default LightList
