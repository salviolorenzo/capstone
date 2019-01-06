import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const events = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2019, 0, 0),
    end: new Date(2019, 0, 1)
  },
  {
    title: 'Long Event',
    start: new Date(2019, 0, 7),
    end: new Date(2019, 0, 10)
  },

  {
    title: 'DTS STARTS',
    start: new Date(2019, 2, 10, 0, 0, 0),
    end: new Date(2019, 2, 20, 0, 0, 0)
  },

  {
    title: 'DTS ENDS',
    start: new Date(2019, 10, 6, 0, 0, 0),
    end: new Date(2019, 10, 10, 0, 0, 0)
  },

  {
    title: 'Some Event',
    start: new Date(2019, 0, 9, 0, 0, 0),
    end: new Date(2019, 0, 9, 0, 0, 0)
  },
  {
    title: 'Conference',
    start: new Date(2019, 0, 11),
    end: new Date(2019, 0, 10),
    desc: 'Big conference for important people'
  }
];

moment.locale('en');
const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'day',
      date: new Date(2019, 0, 6),
      width: '100%'
    };
  }

  render() {
    return (
      <div className='tile calendarTile'>
        <button onClick={() => this.setState({ view: 'day' })}>Day</button>
        <button onClick={() => this.setState({ view: 'week' })}>Week</button>
        <button onClick={() => this.setState({ view: 'month' })}>Month</button>
        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          // events={events}
          step={60}
          localizer={localizer}
          events={events}
          view={this.state.view}
          views={allViews}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    );
  }
}

export default Calendar;
