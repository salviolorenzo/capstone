const db = require('./db');

class Events {
  constructor(id, title, start, end, allDay, resource) {
    this.id = id;
    this.title = title;
    this.allDay = allDay;
    this.start = start;
    this.end = end;
    this.resource = resource;
  }
}

module.exports = Events;
