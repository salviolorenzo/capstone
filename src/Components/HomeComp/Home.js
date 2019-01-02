import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    };
  }

  componentDidMount() {
    fetch('/home')
      .then(result => result.json())
      .then(array => {
        let newArray = array.map(item => {
          return { name: item.name, index: item.index };
        });
        this.setState({
          tiles: newArray
        });
      });
  }
  render() {
    return (
      <div className='home'>
        {this.state.tiles.map(item => {
          return <p>{item.name}</p>;
        })}
      </div>
    );
  }
}

export default Home;
