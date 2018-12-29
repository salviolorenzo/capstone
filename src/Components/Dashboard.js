import React, { Component } from 'react';
import Header from './Header';
import Notes from './Tile';
import Home from './Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className='dashboard'>
          Dashboard
          <Header />
          <div className='tileboard'>
            <Route path='/home' component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}
export default Dashboard;
