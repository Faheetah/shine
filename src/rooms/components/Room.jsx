import React from 'react'

const Room = ({endpoint, room, id, setBri}) => {
  let bri = room.action.on ? +room.action.bri : 0

  let color = 'rgb(80,80,80)'
  if (room.action.on) {
    let b = Math.floor(bri / 3) + 150;
    color = `rgb(${b}, ${b}, 100)`;
  }

  return (
    <li className='alert' role='alert'>
      <div>Name: {room.name}</div>
      <div>Id: {id}</div>
      <div>On: {room.action.on.toString()}</div>
      <div>Brightness: {bri}</div>
      <div className="card-footer slider">
        <input min="0" max="254" type="range" value={bri} 
          style={{backgroundColor:color}}
          onChange={(e) => setBri(id, +e.target.value)} 
         />
      </div>
    </li>
  )
}

export default Room
