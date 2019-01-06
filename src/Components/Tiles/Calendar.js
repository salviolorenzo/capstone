import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

moment.locale('en');
const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'day',
      date: new Date(2019, 0, 6),
      width: '100%',
      modalIsOpen: false,
      selectedEvent: {},
      events: [
        {
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(2019, 0, 0),
          end: new Date(2019, 0, 1),
          desc: 'Big conference for important people'
        },
        {
          title: 'Long Event',
          start: new Date('January 7, 2019 06:30:00'),
          end: new Date('January 7, 2019 08:30:00'),
          desc: 'Big conference for important people'
        },

        {
          title: 'DTS STARTS',
          start: new Date(2019, 2, 10, 0, 0, 0),
          end: new Date(2019, 2, 20, 0, 0, 0),
          desc: 'Big conference for important people'
        },

        {
          title: 'DTS ENDS',
          start: new Date(2019, 10, 6, 0, 0, 0),
          end: new Date(2019, 10, 10, 0, 0, 0),
          desc: 'Big conference for important people'
        },

        {
          title: 'Some Event',
          start: new Date(2019, 0, 9, 0, 0, 0),
          end: new Date(2019, 0, 9, 0, 0, 0),
          desc: 'Big conference for important people'
        },
        {
          title: 'Conference',
          start: new Date(2019, 0, 11),
          end: new Date(2019, 0, 10),
          desc: 'Big conference for important people'
        }
      ]
    };
  }

  displayEvent(event) {
    console.log(event);
    let newEvent = {
      title: event.title,
      start: event.start.toLocaleString(),
      end: event.end.toLocaleString()
    };
    this.setState({
      selectedEvent: newEvent
    });
    this.openModal();
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  afterOpenModal() {
    console.log('opened');
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <div className='tile calendarTile'>
        <button onClick={() => this.setState({ view: 'day' })}>Day</button>
        <button onClick={() => this.setState({ view: 'week' })}>Week</button>
        <button onClick={() => this.setState({ view: 'month' })}>Month</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel='Example Modal'
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            {this.state.selectedEvent.title}
          </h2>
          <p>{this.state.selectedEvent.start}</p>
          <p>{this.state.selectedEvent.end}</p>
          <button onClick={this.closeModal.bind(this)}>close</button>
          <div />
          <form>
            <textarea value={this.state.selectedEvent.desc} />
          </form>
        </Modal>
        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          // events={events}
          step={60}
          localizer={localizer}
          events={this.state.events}
          onSelectEvent={event => this.displayEvent(event)}
          onSelectSlot={event => {
            console.log(event);
          }}
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
