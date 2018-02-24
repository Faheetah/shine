import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as LightActions from '../actions'
import Light from '../components/Light'

class Lights extends Component {
  componentWillMount() {
    this.props.getLights(this.props.endpoint)
  }

  render() {
    return (
      <div>
        <div>
        {this.props.endpoint}
        </div>
        <ul>
          {Object.keys(this.props.lights).map((light, i) => 
            <Light key={i} light={this.props.lights[light]} id={light} setBri={this.props.setBri} />
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lights: state.lights.lights,
  endpoint: state.app.endpoint,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(LightActions, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lights)
