import React, { Component } from 'react';

const eventTypes = ['Music', 'Sports'];

function Tickets(props) {
  return (
    <div className='tile eventTile'>
      <h3>Events</h3>
      <ul className='eventType'>
        {eventTypes.map((item, index) => {
          return (
            <li
              key={index}
              onClick={event => {
                props.handleEventType(item, event);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <ul className='eventList'>
        {props.events.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} target='_blank' rel='norefferer noopener'>
                <img src={item.img} />
                <div className='eventText'>
                  <h5>{item.name}</h5>
                  <br />
                  {item.date}
                  <br />
                  {item.venue.name}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tickets;
