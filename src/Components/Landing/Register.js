import React from 'react';

function Register(props) {
  return (
    <form action='/register' method='POST' className='landingForm'>
      <label>
        Name:
        <br />
        <input type='text' placeholder='John Smith' />
      </label>
      <label>
        Email:
        <br />
        <input type='email' placeholder='john@mail.com' />
      </label>
      <label>
        Password:
        <br />
        <input type='password' placeholder='password' />
      </label>
      <label>
        Confirm password:
        <br />
        <input type='password' placeholder='password' />
      </label>
      <input type='submit' value='Register' />
    </form>
  );
}

export default Register;
