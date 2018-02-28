import React from 'react'

const Light = ({endpoint, light, id, setBri}) => {
  let bri = light.state.on ? +light.state.bri : 0

  let color = 'rgb(80,80,80)'
  if (light.state.on) {
    let b = Math.floor(bri / 3) + 150;
    color = `rgb(${b}, ${b}, 100)`;
  }

  return (
    <div className="card">
      <div className="card-block">
        <div className="card-header">
          <span className="pointer">
            <div className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className="fa fa-lightbulb-o fa-stack-1x"></i>
            </div>

            <div>
              { light.name } { light.id } 
            </div>
          </span>

          <div className="float-right">
            <i className="fa fa-2x fa-toggle-on"></i>
          </div>
        </div>

        <div className="card-footer slider">
          <div>Name: {light.name}</div>
          <div>Id: {id}</div>
          <div>On: {light.state.on.toString()}</div>
          <div>Brightness: {bri}</div>
          <div className="card-footer slider">
            <input min="0" max="254" type="range" value={bri} 
              style={{backgroundColor:color}}
              onChange={(e) => setBri(id, +e.target.value)} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Light
