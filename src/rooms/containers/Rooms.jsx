import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import _ from 'lodash'

import * as RoomActions from '../actions'
import Room from '../components/Room'

class Rooms extends Component {
  componentWillMount() {
    this.props.getRooms(this.props.endpoint)
  }

  setBri = _.throttle(this.props.setBri, 100)

  render() {
    return (
      <div>
        <div>
        {this.props.endpoint}
        </div>
        <div>
          {Object.keys(this.props.rooms).map((room, i) => 
            <Room key={i} room={this.props.rooms[room]} id={room} setBri={this.setBri} />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rooms: state.rooms.rooms,
  endpoint: state.app.endpoint,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(RoomActions, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rooms)
