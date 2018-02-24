import React from 'react'

const Light = ({light, id, setBri}) => {
  return (
    <li className='alert' role='alert'>
      <div>Name: {light.name}</div>
      <div>Id: {id}</div>
      <div>On: {light.state.on}</div>
      <div>Brightness: {light.state.bri}</div>
      <div className="card-footer slider">
        <input min="0" max="254" type="range" value={light.state.bri}
          onChange={(e) => setBri(id, e.target.value)} 
         />
      </div>
    </li>
  )
}

export default Light
