import React, { Component } from 'react';

function Tickets(props) {
  return (
    <div className='tile'>
      <ul />
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
