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
        <Tickets />
      </Router>
    );
  }
}
export default Board_2;
