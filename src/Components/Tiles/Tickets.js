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
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${searchTerm}&dmaId=220&apikey=${
        keys.TMKey
      }`
    )
      .then(r => r.json())
      .then(result => {
        let newArray = result._embedded.events.map(event => {
          return { name: event.name, img: event.images[0].url, url: event.url };
        });
        this.setState({
          events: newArray
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
