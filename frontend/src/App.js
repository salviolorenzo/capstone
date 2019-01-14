import React, { Component } from 'react';
import Home from './Components/HomeComp/Home';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Root from './Components/Landing/Root';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPass: '',
      regName: '',
      regEmail: '',
      regPass: '',
      regPassConf: ''
    };
  }

  handleRegister(item) {
    console.log(item);
  }

  handleLogin(item) {
    item.preventDefault();
    console.log(item.target.email, item.target.password);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            exact
            render={routerProps => {
              return (
                <Root
                  handleLogin={this.handleLogin.bind(this)}
                  handleRegister={this.handleRegister.bind(this)}
                  {...routerProps}
                />
              );
            }}
          />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
