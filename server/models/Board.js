const db = require('./db');

class Board {
  constructor(name, isDefault) {
    this.name = name;
    this.isDefault = isDefault;
  }

  static addBoard(name, isDefault, user_id) {
    return db
      .one(
        `insert into boards
      (name, isDefault, user_id)
      values
        ($1,$2,$3)
        returning id`,
        [name, isDefault, user_id]
      )
      .then(result => {
        return new Board(result.id, name, isDefault, user_id);
      });
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
