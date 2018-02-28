import React from 'react'

import Light from './Light'

const LightList = ({lights}) => {
  return (
    <div>
      {Object.keys(lights).map((light, i) => 
        <Light key={i} light={lights[light]} id={light} />
      )}
    </div>
  )
}

export default LightList
