import React from 'react'

const Room = ({endpoint, room, id, setBri}) => {
  let bri = room.state.any_on ? +room.action.bri : 0

  let color = 'rgb(80,80,80)'
  if (room.state.any_on) {
    let b = Math.floor(bri / 3) + 150;
    color = `rgb(${b}, ${b}, 100)`;
  }

  return (
    <div className="card">
      <div className="card-block">
        <div className="card-header">
          <span className="fa-stack fa-lg" style={{marginRight: '8px'}}>
            <i className="fas fa-circle fa-stack-2x"></i>
            <i className="far fa-lightbulb fa-stack-1x" style={{color:color}}></i>
          </span>

          <span>
            { room.name } ({ id })
          </span>

          <span className="float-right">
            <i className={`fa fa-2x fa-toggle-on ${!room.action.on && 'fa-rotate-180'}`}
               onClick={() => setBri(id, bri > 0 ? 0 : 255)}
               style={{cursor: 'pointer'}}
            ></i>
          </span>
        </div>

        <div className="card-footer slider">
          {/* <div>On: {room.action.on.toString()}</div> */}
          <input min="0" max="254" type="range" value={bri} 
            style={{backgroundColor:color}}
            onChange={(e) => setBri(id, +e.target.value)} 
          />
        </div>
      </div>
    </div>
  )
}

export default Room
