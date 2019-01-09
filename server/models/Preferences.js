const db = require('./db');

class Preferences {
  constructor(id, name, content) {
    this.id = id;
    this.name = name;
    this.content = content;
  }

  // CRUD
  static addPref(user_id, pref_id, term) {
    return db.one(
      `insert into user_preferences
      (user_id, pref_id, term)
      values
      ($1, $2, $3)`,
      [user_id, pref_id, term]
    );
  }

  static getPref(user_id) {
    return db.any(
      `select * from
      user_preferences u
      inner join preferences p
      on u.pref_id = p.id
      where u.user_id= $1`,
      [user_id]
    );
  }

  static removePref(id) {
    return db.result(`delete from user_preferences where id=$1`, [id]);
  }
}

module.exports = Preferences;
