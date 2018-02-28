import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import _ from 'lodash'

import * as LightActions from '../actions'
import Light from '../components/Light'

class Lights extends Component {
  componentWillMount() {
    this.props.getLights(this.props.endpoint)
  }

  setBri = _.throttle(this.props.setBri, 100)

  render() {
    return (
      <div>
        <div>
        {this.props.endpoint}
        </div>
        <div>
          {Object.keys(this.props.lights).map((light, i) => 
            <Light key={i} light={this.props.lights[light]} id={light} setBri={this.setBri} />
          )}
        </div>
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
