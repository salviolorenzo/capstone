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

  componentDidMount() {
    Modal.setAppElement('body');
  }

  isAllDay(allDay) {
    if (allDay) {
      return null;
    } else {
      return (
        <>
          <input
            type="text"
            name="start"
            value={this.props.start}
            onChange={this.props.handleStartTime}
          />
          <input
            type="text"
            name="end"
            value={this.props.end}
            onChange={this.props.handleEndTime}
          />
        </>
      );
    }
  }

  render() {
    return (
      <div className="tile calendarTile">
        <h3>{this.state.header}</h3>
        <div className="calendarHeader">
          <button
            className="calendarBtn"
            onClick={() =>
              this.setState({ view: 'day', header: "Today's Agenda" })
            }
          >
            Day
          </button>
          <button
            className="calendarBtn"
            onClick={() => this.setState({ view: 'week', header: 'This Week' })}
          >
            Week
          </button>
          <button
            className="calendarBtn"
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
          contentLabel="Example Modal"
        >
          <button onClick={this.props.closeModal} className="closeBtn">
            X
          </button>
          <div className="modalText">
            <h2>{this.props.selectedEvent.title}</h2>
            <p>{this.props.selectedEvent.start}</p>
            <p>{this.props.selectedEvent.end}</p>
          </div>
          <form
            className="modalForm"
            onSubmit={event => {
              this.props.handleNewEvent(event);
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={this.props.term}
              onChange={this.props.handleTitleChange}
            />
            <label>
              <input
                type="checkbox"
                name="allDay"
                value={this.props.allDay}
                checked={this.props.allDay}
                onChange={this.props.changeBox}
              />
              All Day
            </label>
            {this.isAllDay(this.props.allDay)}
            <textarea
              name="eventDesc"
              placeholder="Event Description"
              value={this.props.desc}
              onChange={this.props.handleDescChange}
            />
            <button type="submit" value="Save" className="saveBtn">
              Save
            </button>
          </form>
          <form onSubmit={this.props.handleDelete}>
            <button className="modalDelete" type="submit" value="Delete Event">
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
