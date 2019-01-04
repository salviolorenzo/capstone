import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import News from '../Tiles/News';
import Weather from '../Tiles/Weather';

function Board_1(props) {
  return (
    <div className='board'>
      <Weather weather={props.weather} />
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
