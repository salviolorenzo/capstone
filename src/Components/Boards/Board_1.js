import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import News from '../Tiles/News';
import Weather from '../Tiles/Weather';
import Calendar from '../Tiles/Calendar';

function Board_1(props) {
  return (
    <div className='board'>
      <Weather weather={props.weather} icon={props.icon} />
      <Calendar
        events={props.events.map(item => {
          return {
            id: item.id,
            title: item.title,
            allDay: item.allday,
            start: new Date(item.eventstart),
            end: new Date(item.eventend),
            desc: item.description
          };
        })}
      />
      <News news={props.news} />
      {/* Adjust news topics based on preferences either chosen or through machine learning  */}
      {/* Compound multiple sources to list */}
      {/* Truth-meter ??? */}
      {/* Calendar through Google API */}
      {/* When you have a free night, suggest X or Y event  */}
    </div>
  );
}
export default Board_1;
