import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className='landing'>
          <div className='loginReg'>
            <ul>
              <li>
                <Link to='/login'>Log in</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </ul>
            <img src={require('../../images/DSH_LOGO.png')} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </div>
          <footer>
            <p>Built by Lorenzo Salvio</p>
            <ul>
              <li>Icon</li>
              <li>Icon</li>
              <li>Icon</li>
              <li>Icon</li>
            </ul>
          </footer>
        </div>
      </Router>
    );
  }
}

export default Root;
