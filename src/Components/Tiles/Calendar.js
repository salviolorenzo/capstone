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
      date: new Date(),
      width: '100%',
      modalIsOpen: false,
      selectedEvent: {},
      term: '',
      desc: ' ',
      events: props.events
    };
  }

  displayEvent(event) {
    console.log(event);
    let newEvent = {
      id: event.id,
      title: event.title,
      allDay: event.allDay,
      start: moment(event.start.toLocaleString()).format('MM-DD-YYYY HH:mm:ss'),
      end: moment(event.end.toLocaleString()).format('MM-DD-YYYY HH:mm:ss'),
      desc: event.desc
    };
    this.setState({
      selectedEvent: newEvent,
      term: newEvent.title,
      desc: event.desc
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

  onSlotChange(slotInfo) {
    const startDate = moment(slotInfo.start.toLocaleString()).format(
      'MM-DD-YYYY HH:mm:ss'
    );
    const endDate = moment(slotInfo.end.toLocaleString()).format(
      'MM-DD-YYYY HH:mm:ss'
    );
    const newEvent = {
      title: this.state.term,
      allDay: false,
      start: startDate,
      end: endDate,
      desc: this.state.desc
    };
    this.setState({
      selectedEvent: newEvent
    });
    this.openModal();
  }

  handleTitleChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleDescChange(event) {
    this.setState({
      desc: event.target.value
    });
  }

  handleNewEvent(event) {}

  handleDelete(event) {
    event.preventDefault();
    fetch(`/home/events/${this.state.selectedEvent.id}/delete`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application.json'
      // },
      body: {
        id: this.state.selectedEvent.id
      }
    })
      .then(r => r.json())
      .then(res => {
        this.setState({
          events: res.map(item => {
            return {
              id: item.id,
              title: item.title,
              allDay: item.allday,
              start: new Date(item.eventstart),
              end: new Date(item.eventend),
              desc: item.description
            };
          }),
          selectedEvent: {}
        });
      });
    this.closeModal();
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
          <form
            onSubmit={event => {
              this.handleNewEvent(event);
            }}
          >
            <input
              type='text'
              name='title'
              placeholder='Event Title'
              value={this.state.term}
              onChange={this.handleTitleChange.bind(this)}
            />
            <input type='checkbox' name='allDay' value='true' /> All Day
            <input
              type='text'
              name='start'
              value={this.state.selectedEvent.start}
            />
            <input
              type='text'
              name='end'
              value={this.state.selectedEvent.end}
            />
            <textarea
              name='eventDesc'
              placeholder='Event Description'
              value={this.state.desc}
              onChange={this.handleDescChange.bind(this)}
            />
            <input type='submit' />
          </form>
          <form
            onSubmit={event => {
              this.handleDelete(event);
            }}
          >
            <input type='submit' value='Delete Event' />
          </form>
        </Modal>

        <BigCalendar
          selectable={true}
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          // events={events}
          step={60}
          localizer={localizer}
          events={this.state.events}
          onSelectEvent={event => this.displayEvent(event)}
          onSelectSlot={event => {
            this.onSlotChange(event);
          }}
          view={this.state.view}
          views={allViews}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
          timeslots={1}
        />
      </div>
    );
  }
}

export default Calendar;
