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
        <div className="landing">
          <div className="loginReg">
            <img src={require('../../images/DSH_LOGO.png')} />
            <ul>
              <li>
                <Link to="/login"> Log in </Link>
              </li>
              <li>
                <Link to="/register"> Register </Link>
              </li>
            </ul>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
          <footer>
            <ul>
              <li>
                <a
                  title="Email"
                  href="mailto:salviolorenzo@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={require('../../images/emailIcon.png')} />
                </a>
              </li>
              <li>
                <a
                  title="Portfolio"
                  href="https://www.lorenzosalvio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={require('../../images/websiteIcon.png')} />
                </a>
              </li>
              <li>
                <a
                  title="GitHub"
                  href="https://www.github.com/salviolorenzo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={require('../../images/gitIcon.png')} />
                </a>
              </li>
            </ul>
            <p> Built by Lorenzo Salvio </p>
          </footer>
        </div>
      </Router>
    );
  }
}

export default Root;
