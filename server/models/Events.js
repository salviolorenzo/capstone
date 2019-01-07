const db = require('./db');

class Events {
  constructor(id, title, start, end, allDay, description) {
    this.id = id;
    this.title = title;
    this.allDay = allDay;
    this.start = start;
    this.end = end;
    this.description = description;
  }

  static addEvent(title, allDay, start, end, decription) {
    return db.one();
  }
}

module.exports = Events;
