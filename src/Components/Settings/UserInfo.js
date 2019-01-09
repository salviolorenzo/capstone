import React from 'react';

function UserInfo(props) {
  return (
    <form className='settingsForm userInfo'>
      <input
        type='text'
        value={props.user.name}
        onChange={props.handleNewName}
        placeholder='Name'
      />
    </form>
  );
}

export default UserInfo;
