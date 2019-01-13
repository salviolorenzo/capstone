import React, { Component } from 'react';
import Home from './Components/HomeComp/Home';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Root from './Components/Landing/Root';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Root} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
