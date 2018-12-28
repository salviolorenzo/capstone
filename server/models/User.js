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
    this.linkedin_idb = linkedin_id;
    this.instagram_id = instagram_id;
    this.email_id = email_id;
  }
}

module.exports = User;
