import React, { Component } from 'react';

function Weather(props) {
  if (props) {
    return (
      <div className='tile weatherTile'>
        <h3>Today's weather</h3>
        <img src={props.icon} className='weatherIcon' />
        <ul className='weatherList'>
          {Object.values(props.weather).map(item => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className='tile weatherTile'>
        <h3>Loading...</h3>
      </div>
    );
  }
}

export default Weather;
