import React, { Component } from 'react';
const searchTerm = 'music';
const keys = require('../../config');

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch('/home/2/events')
      .then(r => r.json())
      .then(result => {
        this.setState({
          events: result
        });
      });
  }

  render() {
    return (
      <div className='tile'>
        <ul />
        <ul className='newsList'>
          {this.state.events.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url}>{item.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Tickets;
