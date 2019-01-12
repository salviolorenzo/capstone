import React from 'react';

function Register(props) {
  return (
    <form action="/register" method="POST" className="landingForm">
      <label>
        Name:
        <br />
        <input type="text" placeholder="John Smith" name="name" />
      </label>
      <label>
        Email:
        <br />
        <input type="email" placeholder="john@mail.com" name="email" />
      </label>
      <label>
        Password:
        <br />
        <input type="password" placeholder="password" name="password" />
      </label>
      <label>
        Confirm password:
        <br />
        <input type="password" placeholder="password" name="confirmPassword" />
      </label>
      <button type="submit" className="logRegBtn">
        Sign Up
      </button>
    </form>
  );
}

export default Register;
