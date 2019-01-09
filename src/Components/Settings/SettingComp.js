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
    <div>
      <Link to='/home/settings/info'>User Information</Link>
      <Link to='/home/settings/preferences'>User Preferences</Link>
      <Route
        path='/home/settings/info'
        exact
        render={routeProps => {
          return (
            <UserInfo
              user={props.userInfo}
              handleNewName={props.handleNewName}
              handleInfoSubmit={props.handleInfoSubmit}
              handleNewEmail={props.handleNewEmail}
              {...routeProps}
            />
          );
        }}
      />
      <Route
        path='/home/settings/preferences'
        render={routeProps => {
          return (
            <UserPref
              preferences={props.preferences}
              handleNewBackground={props.handleNewBackground}
              handleNewsSource={props.handleNewsSource}
              {...routeProps}
            />
          );
        }}
      />
    </div>
  );
}

export default Settings;
