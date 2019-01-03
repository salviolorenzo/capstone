import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import News from '../Tiles/News';
import Weather from '../Tiles/Weather';

class Board_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    };
  }

  componentDidMount() {
    fetch('/home/1')
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
        <div className='boardlist'>
          {/* {this.state.tiles.map(item => {
            return <p>{item.name}</p>;
          })} */}
          <Weather />
          <News />
          {/* Adjust news topics based on preferences either chosen or through machine learning  */}
          {/* Compound multiple sources to list */}
          {/* Truth-meter ??? */}
          {/* Calendar through Google API */}
          {/* When you have a free night, suggest X or Y event  */}
        </div>
      </Router>
    );
  }
}
export default Board_1;
