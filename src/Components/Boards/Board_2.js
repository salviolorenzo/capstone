import React, { Component, Suspense } from 'react';
const Tickets = React.lazy(() => import('../Tiles/Tickets'));
const Zomato = React.lazy(() => import('../Tiles/Zomato'));

function Board_2(props) {
  return (
    <div className="board">
      <Suspense fallback={<div>Loading...</div>}>
        <Tickets
          handleEventType={props.handleEventType}
          events={props.events}
          addToCalendar={props.addToCalendar}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Zomato restaurants={props.restaurants} />
      </Suspense>
    </div>
  );
}
export default Board_2;
