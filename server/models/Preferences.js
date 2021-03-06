const db = require('./db');

class Preferences {
  constructor(id, term, type) {
    this.id = id;
    this.term = term;
    this.type = type;
  }

  // CRUD
  static addPref(user_id, pref_id, term, type) {
    return db
      .one(
        `insert into user_preferences
      (user_id, pref_id, term)
      values
      ($1, $2, $3)
      returning id`,
        [user_id, pref_id, term]
      )
      .then(data => {
        return new Preferences(data.id, term, type);
      });
  }

  static getPref(user_id) {
    return db.any(
      `select u.id, u.term, p.type from
      user_preferences u
      inner join preferences p
      on u.pref_id = p.id
      where u.user_id=$1`,
      [user_id]
    );
  }

  static removePref(id) {
    return db.result(`delete from user_preferences where id=$1`, [id]);
  }
}

module.exports = Preferences;
