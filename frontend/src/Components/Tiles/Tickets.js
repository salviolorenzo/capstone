import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
    <div className="tile eventTile">
      <h3>Events</h3>
      <ul className="eventType">
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
      <ul className="eventList">
        {props.events.map((item, index) => {
          return (
            <li key={index}>
              <LazyLoadImage
                alt={item.name}
                effect="blur"
                src={item.img}
                height="90px"
                width="30%"
              />
              <div className="eventText">
                <a href={item.url} target="_blank" rel="norefferer noopener">
                  <h4>{item.name}</h4>
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
