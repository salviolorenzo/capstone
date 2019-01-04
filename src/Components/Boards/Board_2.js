import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Tickets from '../Tiles/Tickets';
import Zomato from '../Tiles/Zomato';

function Board_2(props) {
  return (
    <Router>
      <div className='board'>
        {/* Events happening near you */}
        {/* Calendar of events that you might like, cross referenced with your normal calendar data || CAN I MAKE IT ? */}
        <Tickets
          handleEventType={props.handleEventType}
          events={props.events}
        />
        <Zomato restaurants={props.restaurants} />
        {/* Ticket list items can have prices next to them  */}
      </div>
    </Router>
  );
}
export default Board_2;
