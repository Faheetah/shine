import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import * as AppActions from '../actions'

import Loading from '../components/Loading'
import Warning from '../components/Warning'

import Lights from '../../lights/containers/Lights'
import Rooms from '../../rooms/containers/Rooms'

import './App.css'

class App extends Component {
  componentWillMount() {
    if(!this.props.endpoint) {
      this.props.findEndpoint()
    } else {
      this.props.setLoading(false)
    }
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <nav className="nav nav-pills" id="navbarNavAltMarkup">
            <Link className='nav-item nav-link' to="/rooms">Rooms</Link>
            <Link className='nav-item nav-link' to="/lights">Lights</Link>
            <span className='nav-item nav-link' to="/" onClick={this.props.linkLight}>link light</span>
          </nav>

          { 
            this.props.error && <Warning message={this.props.error} />
          }

          {
            this.props.loading ? <Loading /> :
              <div>
                <Route exact path='/' component={Rooms} />
                <Route path='/rooms' component={Rooms} />
                <Route path='/lights' component={Lights} />
              </div>
          }
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  error: state.app.error,
  loading: state.app.loading,
  endpoint: state.app.endpoint,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(AppActions, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
