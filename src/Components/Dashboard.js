import React, { Component } from 'react';
import Header from './Header';
import Home from './HomeComp/Home';
import Setting from './Settings/SettingComp';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BoardList from './Boards/Boards';

import Settings from './Settings';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className='dashboard'>
          <Route path='/home/dash' component={Home} />
          {/* <Route path='/boards' component={BoardList} /> */}
        </div>
      </Router>
    );
  }
}
export default Dashboard;
