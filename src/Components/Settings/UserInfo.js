import React, { Component } from 'react';

function UserInfo(props) {
  return (
    <form
      className='settingsForm userInfo'
      onSubmit={event => {
        props.handleInfoSubmit(event);
      }}
    >
      <label>
        Name:
        <br />
        <input
          type='text'
          value={props.user.name}
          onChange={event => {
            props.handleNewName(event);
          }}
          placeholder='Name'
          name='name'
        />
      </label>
      <label>
        Email:
        <br />
        <input
          type='email'
          value={props.user.email}
          onChange={event => {
            props.handleNewEmail(event);
          }}
          placeholder='Email'
          name='email'
        />
      </label>
      <label>
        Current Password
        <br />
        <input type='password' placeholder='p455w0rd!' name='curPass' />
      </label>
      <label>
        New Password:
        <br />
        <input type='password' placeholder='p455w0rd!' name='newPass' />
      </label>
      <label>
        Confirm New Password:
        <br />
        <input type='password' placeholder='p455w0rd!' name='confirmNewPass' />
      </label>
      <input type='submit' value='Save' />
    </form>
  );
}

export default UserInfo;
