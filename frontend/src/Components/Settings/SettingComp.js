import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserPref from './UserPref';

// USER SHOULD BE ABLE TO:
// -- Adjust their info
// -- Adjust background pictures
// -- Add preffered news sources

function Settings(props) {
  return (
    <div className='settings'>
      <div className='settingsLinks'>
        <Link to='/home/settings/info'>
          <button>User Information</button>
        </Link>
        <Link to='/home/settings/preferences'>
          <button>User Preferences</button>
        </Link>
      </div>
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
              bgTerm={props.bgTerm}
              newsTerm={props.newsTerm}
              handleBgTermChange={props.handleBgTermChange}
              handleNewsTermChange={props.handleNewsTermChange}
              handleNewBackground={props.handleNewBackground}
              handleNewsSource={props.handleNewsSource}
              handlePrefDelete={props.handlePrefDelete}
              {...routeProps}
            />
          );
        }}
      />
    </div>
  );
}

export default Settings;
