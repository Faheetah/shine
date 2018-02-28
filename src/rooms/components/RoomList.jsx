import React from 'react'

import Room from './Room'

const RoomList = ({rooms}) => {
  return (
    <div>
      {Object.keys(rooms).map((room, i) => 
        <Room key={i} room={rooms[room]} id={room} />
      )}
    </div>
  )
}

export default RoomList
