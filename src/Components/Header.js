import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <nav>
        <li>
          <Link to='/home/settings'>
            <button>Settings</button>
          </Link>
        </li>

        <Link to='/home/dash1'>
          <img src={require('../images/DSH_LOGO.png')} />
        </Link>
        {/* <li>
          <Link to='/boards'>Boards</Link>
        </li> */}
        <form method='POST' action='/logout'>
          <button type='submit' value='Log Out'>
            Log Out
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Header;
