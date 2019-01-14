import React from 'react';

function Register(props) {
  return (
    <form
      onSubmit={item => {
        props.handleRegister(item);
      }}
      className="landingForm"
    >
      <label>
        Name:
        <br />
        <input
          type="text"
          placeholder="John Smith"
          name="name"
          value={props.regName}
          onChange={event => {
            props.handleRegNameChange(event);
          }}
        />
      </label>
      <label>
        Email:
        <br />
        <input
          type="email"
          placeholder="john@mail.com"
          name="email"
          value={props.regEmail}
          onChange={event => {
            props.handleRegEmailChange(event);
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
          value={props.regPass}
          onChange={event => {
            props.handleRegPassChange(event);
          }}
        />
      </label>
      <label>
        Confirm password:
        <br />
        <input
          type="password"
          placeholder="password"
          name="confirmPassword"
          value={props.regPassConf}
          onChange={event => {
            props.handleRegPassConfChange(event);
          }}
        />
      </label>
      <button type="submit" className="logRegBtn">
        Sign Up
      </button>
    </form>
  );
}

export default Register;
