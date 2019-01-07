const db = require('./db');

class Events {
  constructor(id, title, eventStart, eventEnd, allDay, description) {
    this.id = id;
    this.title = title;
    this.allDay = allDay;
    this.eventStart = eventStart;
    this.eventEnd = eventEnd;
    this.description = description;
  }

  static addEvent(title, allDay, eventStart, eventEnd, description, user_id) {
    return db
      .one(
        `insert into events
        (title, allDay, eventStart, eventEnd, description, user_id)
        values
        ($1, $2, $3, $4, $5, $6)
        returning id`,
        [title, allDay, eventStart, eventEnd, description, user_id]
      )
      .then(result => {
        return new Events(
          result.id,
          title,
          allDay,
          eventStart,
          eventEnd,
          description
        );
      });
  }

  static getAll(user_id) {
    return db.any(`select * from events where user_id=$1`, [user_id]);
  }

  static getById(id) {
    return db.any(`select * from events where id=$1`, [id]);
  }

  static editEvent(title, allDay, description, user_id) {
    return db.result(
      `update events
      set title=$1,
      allDay=$2,
      description=$3
      where user_id=$4
      `,
      [title, allDay, description, user_id]
    );
  }

  static deleteEvent(id) {
    return db.result(`delete from events where id=$1`, [id]);
  }
}

module.exports = Events;
