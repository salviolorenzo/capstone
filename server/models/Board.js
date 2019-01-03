const db = require('./db');

class Board {
  constructor(name) {
    this.name = name;
  }

  static getByUser(user_id) {
    return db.any(`select * from boards where user_id=$1`, [user_id]);
  }

  static getById(id) {
    return db.one(`select * from boards where id=$1`, [id]);
  }

  static getDefaultBoard(user_id) {
    return db.any(`select * from boards where user_id=$1 AND isDefault=true`, [
      user_id
    ]);
  }

  static setDefaultBoard(user_id, board_id) {
    return db.result(
      `update boards
        set isDefault=true
        where user_id=$1 
        AND board_id=$2`,
      [user_id, board_id]
    );
  }

  static removeDefaultBoard(user_id, board_id) {
    return db.result(
      `update boards
        set isDefault=false
        where user_id=$1 
        AND board_id=$2`,
      [user_id, board_id]
    );
  }
}

module.exports = Board;
