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
      header: `Today's Agenda`
    };
  }

  // displayEvent(event) {
  //   console.log(event);
  //   let newEvent = {
  //     id: event.id,
  //     title: event.title,
  //     allDay: event.allDay,
  //     start: moment(event.start.toLocaleString()).format('MM-DD-YYYY HH:mm:ss'),
  //     end: moment(event.end.toLocaleString()).format('MM-DD-YYYY HH:mm:ss'),
  //     desc: event.desc
  //   };
  //   this.setState({
  //     selectedEvent: newEvent,
  //     term: newEvent.title,
  //     desc: event.desc
  //   });
  //   this.openModal();
  // }

  // openModal() {
  //   this.setState({
  //     modalIsOpen: true
  //   });
  // }

  // afterOpenModal() {
  //   console.log('opened');
  // }

  // closeModal() {
  //   this.setState({
  //     modalIsOpen: false,
  //     selectedEvent: {},
  //     term: '',
  //     desc: ''
  //   });
  // }

  // onSlotChange(slotInfo) {
  //   const startDate = moment(slotInfo.start.toLocaleString()).format(
  //     'MM-DD-YYYY HH:mm:ss'
  //   );
  //   const endDate = moment(slotInfo.end.toLocaleString()).format(
  //     'MM-DD-YYYY HH:mm:ss'
  //   );
  //   const newEvent = {
  //     title: this.state.term,
  //     allDay: false,
  //     start: startDate,
  //     end: endDate,
  //     desc: this.state.desc
  //   };
  //   this.setState({
  //     selectedEvent: newEvent,
  //     start: newEvent.start,
  //     end: newEvent.end
  //   });
  //   this.openModal();
  // }

  // handleTitleChange(event) {
  //   this.setState({
  //     term: event.target.value
  //   });
  // }

  // handleDescChange(event) {
  //   this.setState({
  //     desc: event.target.value
  //   });
  // }

  // handleStartTime(event) {
  //   this.setState({
  //     start: event.target.value
  //   });
  // }

  // handleEndTime(event) {
  //   this.setState({
  //     end: event.target.value
  //   });
  // }

  // changeBox(event) {
  //   this.setState({ allDay: event.target.checked });
  // }

  // handleNewEvent(event) {
  //   event.preventDefault();
  //   const newEvent = {
  //     id: this.state.selectedEvent.id,
  //     title: this.state.term,
  //     allDay: this.state.allDay,
  //     start: this.state.start,
  //     end: this.state.end,
  //     description: this.state.desc
  //   };

  //   console.log(newEvent);
  //   fetch('/home/events/new', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newEvent)
  //   })
  //     .then(r => r.json())
  //     .then(result => {
  //       console.log(result);
  //       const addEvent = {
  //         id: result.id,
  //         title: result.title,
  //         allDay: result.allDay,
  //         start: new Date(result.eventStart),
  //         end: new Date(result.eventEnd),
  //         desc: result.description
  //       };
  //       this.setState({
  //         events: [...this.state.events, addEvent],
  //         selectedEvent: {}
  //       });
  //     });
  //   this.closeModal();
  // }

  // handleDelete(event) {
  //   event.preventDefault();
  //   fetch(`/home/events/${this.state.selectedEvent.id}/delete`, {
  //     method: 'POST',
  //     // headers: {
  //     //   'Content-Type': 'application.json'
  //     // },
  //     body: {
  //       id: this.state.selectedEvent.id
  //     }
  //   })
  //     .then(r => r.json())
  //     .then(res => {
  //       this.setState({
  //         events: res.map(item => {
  //           return {
  //             id: item.id,
  //             title: item.title,
  //             allDay: item.allday,
  //             start: new Date(item.eventstart),
  //             end: new Date(item.eventend),
  //             desc: item.description
  //           };
  //         }),
  //         selectedEvent: {}
  //       });
  //     });
  //   this.closeModal();
  // }

  isAllDay(allDay) {
    if (allDay) {
      return null;
    } else {
      return (
        <>
          <input
            type='text'
            name='start'
            value={this.props.start}
            onChange={this.props.handleStartTime}
          />
          <input
            type='text'
            name='end'
            value={this.props.end}
            onChange={this.props.handleEndTime}
          />
        </>
      );
    }
  }

  render() {
    return (
      <div className='tile calendarTile'>
        <h3>{this.state.header}</h3>
        <div className='calendarHeader'>
          <button
            className='calendarBtn'
            onClick={() =>
              this.setState({ view: 'day', header: "Today's Agenda" })
            }
          >
            Day
          </button>
          <button
            className='calendarBtn'
            onClick={() => this.setState({ view: 'week', header: 'This Week' })}
          >
            Week
          </button>
          <button
            className='calendarBtn'
            onClick={() =>
              this.setState({ view: 'month', header: 'This Month' })
            }
          >
            Month
          </button>
        </div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel='Example Modal'
        >
          <button onClick={this.props.closeModal} className='closeBtn'>
            X
          </button>
          <div className='modalText'>
            <h2>{this.props.selectedEvent.title}</h2>
            <p>{this.props.selectedEvent.start}</p>
            <p>{this.props.selectedEvent.end}</p>
          </div>
          <form
            className='modalForm'
            onSubmit={event => {
              this.props.handleNewEvent(event);
            }}
          >
            <input
              type='text'
              name='title'
              placeholder='Event Title'
              value={this.props.term}
              onChange={this.props.handleTitleChange}
            />
            <label>
              <input
                type='checkbox'
                name='allDay'
                value={this.props.allDay}
                checked={this.props.allDay}
                onChange={this.props.changeBox}
              />
              All Day
            </label>
            {this.isAllDay(this.props.allDay)}
            <textarea
              name='eventDesc'
              placeholder='Event Description'
              value={this.props.desc}
              onChange={this.props.handleDescChange}
            />
            <input type='submit' value='Save' className='saveBtn' />
          </form>
          <form onSubmit={this.props.handleDelete}>
            <button className='modalDelete' type='submit' value='Delete Event'>
              Delete Event
            </button>
          </form>
        </Modal>

        <BigCalendar
          selectable={true}
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          // events={events}
          step={60}
          localizer={localizer}
          events={this.props.events}
          onSelectEvent={event => {
            this.props.displayEvent(event);
          }}
          onSelectSlot={event => {
            this.props.onSlotChange(event);
          }}
          view={this.state.view}
          views={allViews}
          onView={() => {}}
          date={this.state.date}
          scrollToTime={this.state.date}
          onNavigate={date => this.setState({ date })}
          timeslots={1}
        />
      </div>
    );
  }
}

export default Calendar;
