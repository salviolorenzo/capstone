const db = require('./db');

class Tile {
  constructor(name) {
    this.name = name;
  }

  static getByBoard(board_id) {
    return db.any(
      `select * from board_tiles b
      inner join tiles t
      on b.tile_id = t.id
      where b.board_id=$1 `,
      [board_id]
    );
  }
}

module.exports = Tile;
