import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <nav>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/boards'>Boards</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
      </nav>
    </header>
  );
}

export default Header;
