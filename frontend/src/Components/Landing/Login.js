import React from 'react';

function Login(props) {
  return (
    <form action="/login" method="POST" className="landingForm">
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
      <button type="submit" className="logRegBtn">
        Log in
      </button>
    </form>
  );
}

export default Login;
