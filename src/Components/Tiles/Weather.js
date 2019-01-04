import React, { Component } from 'react';

function Weather(props) {
  if (props) {
    return (
      <div className='tile weatherTile'>
        <h3>Weather</h3>
        {Object.values(props.weather).map(item => {
          return <p>{item}</p>;
        })}
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
