import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Tickets from '../Tiles/Tickets';

class Board_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    };
  }

  componentDidMount() {
    fetch('/home/2')
      .then(r => r.json())
      .then(array => {
        this.setState({
          tiles: array
        });
      });
  }
  render() {
    return (
      <Router>
        {/* Events happening near you */}
        {/* Calendar of events that you might like, cross referenced with your normal calendar data || CAN I MAKE IT ? */}
        <Tickets />
        {/* Ticket list items can have prices next to them  */}
      </Router>
    );
  }
}
export default Board_2;
