import React, { Component } from 'react';
import Header from './Header';
import Tile from './Tile';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='dashboard'>
        Dashboard
        <Header />
        <Tile />
      </div>
    );
  }
}

export default Dashboard;
