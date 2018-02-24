import React from 'react'

const Light = ({light}) => {
  return (
    <div className='alert alert-info' role='alert'>
      {JSON.stringify(light)}
    </div>
  )
}

export default Light
