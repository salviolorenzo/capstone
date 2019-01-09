const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static addUser(name, email, password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return db
      .one(
        `insert into users(name, email, password)
    values
    ($1, $2, $3) 
    returning id`,
        [name, email, hash]
      )
      .then(result => {
        return new User(result.id, name, email, hash);
      });
  }

  static getUserById(id) {
    return db.one(`select * from users where id=$1`, [id]);
  }

  static getByEmail(email) {
    return db
      .one(`select * from users where email=$1`, [email])
      .then(result => {
        return new User(result.id, result.name, result.email, result.password);
      });
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  static updateName(newName, user_id) {
    return db.result(
      `update users
      set name=$1
      where id=$2`,
      [newName, user_id]
    );
  }

  static updateEmail(newEmail, user_id) {
    return db.result(
      `update users
      set email=$1
      where id=$2`,
      [newEmail, user_id]
    );
  }

  static updatePass(newPass, user_id) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(newPass, salt);
    return db.result(
      `update users
      set password=$1
      where id=$2`,
      [hash, user_id]
    );
  }
}

module.exports = User;
