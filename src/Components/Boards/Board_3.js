import React, { Suspense, lazy } from 'react';
const Map = React.lazy(() => import('../Tiles/Map'));

function Board_3(props) {
  return (
    <div className="board mapBoard">
      <Suspense fallback={<div>Loading...</div>}>
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
        />{' '}
      </Suspense>

      {/* Mapping and transportation based on the weather. Machine learning to predict traffic  */}
      {/* Map incorporates restaurants and places to go. "I don't want to go farther than this from where I am" */}
    </div>
  );
}
export default Board_3;
