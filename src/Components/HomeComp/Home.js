import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Weather from '../Weather';
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
          return item.name;
        });
        this.setState({
          tiles: newArray
        });
      });
  }
  render() {
    return (
      <div className='home'>
        {this.state.tiles.includes('weather') ? <Weather /> : null}
      </div>
    );
  }
}

export default Home;
