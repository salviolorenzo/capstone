import React, { Component, Suspense } from 'react';
const Calendar = React.lazy(() => import('../Tiles/Calendar'));
const Weather = React.lazy(() => import('../Tiles/Weather'));
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const News = React.lazy(() => import('../Tiles/News'));

function Board_1(props) {
  return (
    <div className="board">
      <Suspense fallback={<div>Loading...</div>}>
        <Weather weather={props.weather} icon={props.icon} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
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
          selectedEvent={props.selectedEvent}
          modalIsOpen={props.modalIsOpen}
          allDay={props.allDay}
          term={props.term}
          desc={props.desc}
          start={props.start}
          end={props.end}
          displayEvent={props.displayEvent}
          openModal={props.openModal}
          afterOpenModal={props.afterOpenModal}
          closeModal={props.closeModal}
          onSlotChange={props.onSlotChange}
          handleNewEvent={props.handleNewEvent}
          handleDelete={props.handleDelete}
          handleTitleChange={props.handleTitleChange}
          handleDescChange={props.handleDescChange}
          handleStartTime={props.handleStartTime}
          handleEndTime={props.handleEndTime}
          changeBox={props.changeBox}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <News
          news={props.news}
          handleNewsSearch={props.handleNewsSearch}
          queryTerm={props.queryTerm}
          handleQueryTerm={props.handleQueryTerm}
        />
      </Suspense>

      {/* Adjust news topics based on preferences either chosen or through machine learning  */}
      {/* Compound multiple sources to list */}
      {/* Truth-meter ??? */}
      {/* Calendar through Google API */}
      {/* When you have a free night, suggest X or Y event  */}
    </div>
  );
}
export default Board_1;
