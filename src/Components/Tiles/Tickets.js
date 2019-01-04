import React, { Component } from 'react';

const eventTypes = ['Music', 'Sports'];

function Tickets(props) {
  return (
    <div className='tile'>
      <ul className='eventType'>
        {eventTypes.map(item => {
          return (
            <li
              onClick={event => {
                props.handleEventType(item, event);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <ul className='newsList'>
        {props.events.map((item, index) => {
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

export default Tickets;
