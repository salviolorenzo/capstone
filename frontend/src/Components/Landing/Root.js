import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPass: '',
      regName: '',
      regEmail: '',
      regPass: '',
      regPassConf: '',
      isLoggedIn: '',
      loginError: '',
      regError: ''
    };
  }

  handleLoginChange(event) {
    this.setState({
      loginEmail: event.target.value
    });
  }

  handlePassChange(event) {
    this.setState({
      loginPass: event.target.value
    });
  }

  handleRegNameChange(event) {
    this.setState({
      regName: event.target.value
    });
  }

  handleRegEmailChange(event) {
    this.setState({
      regEmail: event.target.value
    });
  }

  handleRegPassChange(event) {
    this.setState({
      regPass: event.target.value
    });
  }

  handleRegPassConfChange(event) {
    this.setState({
      regPassConf: event.target.value
    });
  }

  handleRegister(item) {
    console.log(item);
    item.preventDefault();
    const logObject = {
      name: this.state.regName,
      email: this.state.regEmail,
      password: this.state.regPass
    };
    if (this.state.regPass === this.state.regPassConf) {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logObject)
      })
        .then(r => r.json())
        .then(result => {
          if (result) {
            this.setState({
              isLoggedIn: true
            });
          }
        });
    } else {
      this.setState({
        regError: 'Passwords did not match.'
      });
    }
  }

  handleLogin(item) {
    item.preventDefault();
    const logObject = {
      email: this.state.loginEmail,
      password: this.state.loginPass
    };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logObject)
    })
      .then(r => r.json())
      .then(result => {
        if (result) {
          this.setState({
            isLoggedIn: result
          });
        } else {
          this.setState({
            loginError: 'Email address or password were incorrect.'
          });
        }
      });
  }
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/home/dash1" />;
    } else {
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
              <Route
                path="/login"
                render={routerProps => {
                  return (
                    <Login
                      handleLogin={this.handleLogin.bind(this)}
                      error={this.state.loginError}
                      loginEmail={this.state.loginEmail}
                      loginPass={this.state.loginPass}
                      handleLoginChange={this.handleLoginChange.bind(this)}
                      handlePassChange={this.handlePassChange.bind(this)}
                      {...routerProps}
                    />
                  );
                }}
              />
              <Route
                path="/register"
                render={routerProps => {
                  return (
                    <Register
                      handleRegister={this.handleRegister.bind(this)}
                      error={this.state.regError}
                      regName={this.state.regName}
                      regEmail={this.state.regEmail}
                      regPass={this.state.regPass}
                      regPassConf={this.state.regPassConf}
                      handleRegNameChange={this.handleRegNameChange.bind(this)}
                      handleRegEmailChange={this.handleRegEmailChange.bind(
                        this
                      )}
                      handleRegPassChange={this.handleRegPassChange.bind(this)}
                      handleRegPassConfChange={this.handleRegPassConfChange.bind(
                        this
                      )}
                      {...routerProps}
                    />
                  );
                }}
              />
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
}

export default Root;
