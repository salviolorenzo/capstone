const db = require('./db');

class Events {
  constructor(id, title, start, end, allDay, resource) {
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
    this.allDay = allDay;
    this.resource = resource;
  }
}
