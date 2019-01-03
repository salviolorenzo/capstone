import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <nav>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>

        <Link to='/home'>
          <img src={require('../images/DSH_LOGO.png')} />
        </Link>
        {/* <li>
          <Link to='/boards'>Boards</Link>
        </li> */}
        <form method='POST' action='/logout'>
          <input type='submit' value='Log Out' />
        </form>
      </nav>
    </header>
  );
}

export default Header;
