import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Board_1 from './Board_1';
import Board_2 from './Board_2';
import Board_3 from './Board_3';

function BoardList(props) {
  return (
    <Router>
      <div className='boardlist'>
        <ul>
          <li>
            <Link to='/boards/1'>Board 1</Link>
          </li>
          <li>
            <Link to='/boards/2'>Board 2</Link>
          </li>
          <li>
            <Link to='/boards/3'>Board 3</Link>
          </li>
        </ul>
        <Route path='/boards/1' component={Board_1} />
        <Route path='/boards/2' component={Board_2} />
        <Route path='/boards/3' component={Board_3} />
      </div>
    </Router>
  );
}
export default BoardList;
