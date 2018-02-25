import React from 'react'

const Light = ({endpoint, light, id, setBri}) => {
  let bri = light.state.on ? +light.state.bri : 0

  let color = 'rgb(80,80,80)'
  if (light.state.on) {
    let b = Math.floor(bri / 3) + 150;
    color = `rgb(${b}, ${b}, 100)`;
  }

  return (
    <li className='alert' role='alert'>
      <div>Name: {light.name}</div>
      <div>Id: {id}</div>
      <div>On: {light.state.on.toString()}</div>
      <div>Brightness: {bri}</div>
      <div className="card-footer slider">
        <input min="0" max="254" type="range" value={bri} 
          style={{backgroundColor:color}}
          onChange={(e) => setBri(endpoint, id, +e.target.value)} 
         />
      </div>
    </li>
  )
}

export default Light
