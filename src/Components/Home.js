import Notes from './Tile';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function Home(props) {
  return (
    <Router>
      <div className='home'>
        <ul className='boardList'>
          <li>Board 1</li>
          <li>Board 2</li>
          <li>Board 3</li>
        </ul>
        <Route path='/home/boards/1' component={Board_1} />
        <Route path='/home/boards/2' component={Board_2} />
        <Route path='/home/boards/3' component={Board_3} />
      </div>
    </Router>
  );
}

export default Home;
