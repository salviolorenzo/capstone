import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserPref from './UserPref';

// USER SHOULD BE ABLE TO:
// -- Adjust their info
// -- Adjust background pictures
// -- Add preffered news sources

function Settings(props) {
  return (
    <Router>
      <div>
        <Route
          path='/home/settings/info'
          render={props => {
            return <UserInfo {...props} />;
          }}
        />
        <Route
          path='/home/settings/preferences'
          render={props => {
            return <UserPref />;
          }}
        />
        <Link to='/home/settings/info'>User Information</Link>
        <Link to='/home/settings/preferences'>User Preferences</Link>
      </div>
    </Router>
  );
}

export default Settings;
