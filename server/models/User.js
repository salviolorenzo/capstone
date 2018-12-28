const db = require('./db');

class User {
  constructor(
    id,
    name,
    email,
    password,
    github_id,
    facebook_id,
    twitter_id,
    linkedin_id,
    instagram_id,
    email_id
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.github_id = github_id;
    this.facebook_id = facebook_id;
    this.twitter_id = twitter_id;
    this.linkedin_id = linkedin_id;
    this.instagram_id = instagram_id;
    this.email_id = email_id;
  }

  static addUser(name, email, password) {
    return db.one(
      `insert into users(name, email, password, github_id, facebook_id, twitter_id, linkedin_id, instagram_id, email_id)
    values
    ($1, $2, $3, $4, $4, $4, $4, $4, $4 )`,
      [name, email, password, '']
    );
  }

  static getUserById(id) {
    return db.one(`select * from users where id=$1`, [id]);
  }

  static FBFind(fb_id) {
    return db
      .one(`select * from users where facebook_id =$1`, [fb_id])
      .then(user => {
        return new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.github_id,
          user.facebook_id,
          user.twitter_id,
          user.linkedin_id,
          user.instagram_id,
          user.email_id
        );
      });
  }

  static updateFBId(fb_id, id) {
    return db.result(
      `update users
      set fb_id=$1
      where id=$2`,
      [fb_id, id]
    );
  }
}

module.exports = User;
