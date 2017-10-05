import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AuthActions from '../actions/auth'

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.authenticate()
  }

  render() {
    if(this.props.error && this.props.retries < 1) {
      return (
        <div>
          <p>Could not connect to Hue</p>
          <a href="/" onClick={this.props.reset}>Retry</a>
        </div>
      )
    } else if (this.props.error) {
      return <div>{this.props.error}</div>
    } else if(this.props.fetching) {
      return <div>Loading</div>
    } else if(this.props.endpoint) {
      return <div>Light list</div>
    } else if(this.props.hubs.length > 0) {
      return (
        <ul>
          {this.props.hubs.map(h =>
            <li key={h.id}>{h.internalipaddress}</li>
          )}
        </ul>
      )
    }
  }
}

const mapStateToProps = state => ({
  fetching: state.auth.fetching,
  hubs: state.auth.hubs,
  endpoint: state.auth.endpoint,
  retries: state.auth.retries,
  error: state.auth.error
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(AuthActions, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
