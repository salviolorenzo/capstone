import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Map from '../Tiles/Map';

function Board_3(props) {
  return (
    <div className='board mapBoard'>
      <Map
        coords={props.coords}
        restaurants={props.markers}
        events={props.events.filter(item => {
          if (item.venue) {
            return item;
          } else {
            return null;
          }
        })}
      />
      {/* Mapping and transportation based on the weather. Machine learning to predict traffic  */}
      {/* Map incorporates restaurants and places to go. "I don't want to go farther than this from where I am" */}
    </div>
  );
}
export default Board_3;
