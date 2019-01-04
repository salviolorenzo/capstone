import React, { Component } from 'react';

function Weather(props) {
  return (
    <div className='tile weatherTile'>
      <h3>Weather</h3>
      {Object.values(props.weather).map(item => {
        return <p>{item}</p>;
      })}
    </div>
  );
}

export default Weather;
