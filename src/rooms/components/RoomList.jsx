import React from 'react'

import Room from './Room'

const RoomList = ({rooms}) => {
  return (
    <ul>
      {Object.keys(rooms).map((room, i) => 
        <Room key={i} room={rooms[room]} id={room} />
      )}
    </ul>
  )
}

export default RoomList
