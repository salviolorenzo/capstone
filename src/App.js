import React, { Component } from 'react';
import Dashboard from './Components/Dashboard';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Root from './Components/Landing/Root';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact component={Root} />
          <Route path='/home' component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
