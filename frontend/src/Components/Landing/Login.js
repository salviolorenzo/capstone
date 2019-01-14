import React from 'react';

function Login(props) {
  return (
    <form
      onSubmit={item => {
        props.handleLogin(item);
      }}
      className="landingForm"
    >
      <label>
        Email:
        <br />
        <input
          type="email"
          placeholder="john@mail.com"
          name="email"
          value={props.loginEmail}
          onChange={event => {
            props.handleLoginChange(event);
          }}
        />
      </label>
      <label>
        Password:
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={props.loginPass}
          onChange={event => {
            props.handlePassChange(event);
          }}
        />
      </label>
      <button type="submit" className="logRegBtn">
        Log in
      </button>
      <p className="errorMsg">{props.error}</p>
    </form>
  );
}

export default Login;
