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
    return db.one(`select * from users where id=$1`, [id]).then(result => {
      return new User(result.id, result.name, result.email, result.password);
    });
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

  updateName(newName) {
    return db.result(
      `update users
      set name=$1
      where id=$2`,
      [newName, this.id]
    );
  }

  updateEmail(newEmail) {
    return db.result(
      `update users
      set email=$1
      where id=$2`,
      [newEmail, this.id]
    );
  }

  updatePass(newPass) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(newPass, salt);
    return db.result(
      `update users
      set password=$1
      where id=$2`,
      [hash, this.id]
    );
  }
}

module.exports = User;
