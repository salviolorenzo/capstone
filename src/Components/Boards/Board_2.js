import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Tickets from '../Tiles/Tickets';

function Board_2(props) {
  return (
    <Router>
      <div className='board'>
        {/* Events happening near you */}
        {/* Calendar of events that you might like, cross referenced with your normal calendar data || CAN I MAKE IT ? */}
        <Tickets events={props.events} />
        {/* Ticket list items can have prices next to them  */}
      </div>
    </Router>
  );
}
export default Board_2;
