import React from 'react';

function Login(props) {
  return (
    <form action='/login' method='POST' className='landingForm'>
      <label>
        Email:
        <br />
        <input type='email' placeholder='john@mail.com' name='email' />
      </label>
      <label>
        Password:
        <br />
        <input type='password' placeholder='password' name='password' />
      </label>
      <input type='submit' value='Log in' />
    </form>
  );
}

export default Login;
