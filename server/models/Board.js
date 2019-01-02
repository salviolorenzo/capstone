const db = require('./db');

class Board {
  constructor(name) {
    this.name = name;
  }

  static getByUser(user_id) {
    return db.any(`select * from boards where user_id=$1`, [user_id]);
  }
}

module.exports = Board;
