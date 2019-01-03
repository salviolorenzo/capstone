import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Board_3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    };
  }

  componentDidMount() {
    fetch('/home/3')
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
        <div className='board'>
          {this.state.tiles.map(item => {
            return <p>{item.name}</p>;
          })}
          {/* Mapping and transportation based on the weather. Machine learning to predict traffic  */}
          {/* Map incorporates restaurants and places to go. "I don't want to go farther than this from where I am" */}
        </div>
      </Router>
    );
  }
}
export default Board_3;
