-- Users have:
  -- Name, email, pssword, accounts
  -- Accounts: Github, Twitter, Facebook, Linkedin, Instagram, gmail 

create table users (
  id serial primary key,
  name varchar(50) not null ,
  email varchar(50) not null unique,
  password varchar(100) not null,
  github_id varchar(30),
  facebook_id varchar(30),
  twitter_id varchar(30),
  linkedin_id varchar(30),
  instagram_id varchar(30),
  spotify_id varchar(30),
  reddit_id varchar(30),
  soundcloud_id varchar(30),
  amazon_id varchar(30),
  email_id varchar(30)
);

create table notes (
  id serial primary key,
  title text,
  content text,
  user_id integer references users(id)  
);

create table todos (
  id serial primary key,
  title text,
  content text,
  user_id integer references users(id)  
);