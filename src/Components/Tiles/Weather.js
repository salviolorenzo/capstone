import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Weather(props) {
  if (props) {
    return (
      <div className="tile weatherTile">
        <h3>Today's weather</h3>
        <LazyLoadImage
          src={props.icon}
          className="weatherIcon"
          alt="WeatherIcon"
        />
        <ul className="weatherList">
          {Object.values(props.weather).map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="tile weatherTile">
        <h3>Loading...</h3>
      </div>
    );
  }
}

export default Weather;
