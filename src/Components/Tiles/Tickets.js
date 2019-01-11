import React, { Component } from 'react';

const eventTypes = ['Music', 'Sports'];

function displayVenue(item) {
  if (item.venue !== undefined) {
    return item.venue.name;
  } else {
    return null;
  }
}

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
              <button>{item}</button>
            </li>
          );
        })}
      </ul>
      <ul className='eventList'>
        {props.events.map((item, index) => {
          return (
            <li key={index}>
              <img src={item.img} />
              <div className='eventText'>
                <a href={item.url} target='_blank' rel='norefferer noopener'>
                  <h5>{item.name}</h5>
                </a>

                <div>
                  {item.date}
                  <br />
                  {displayVenue(item)}
                </div>
                <button
                  onClick={() => {
                    props.addToCalendar(item);
                  }}
                >
                  Add to my Calendar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tickets;
