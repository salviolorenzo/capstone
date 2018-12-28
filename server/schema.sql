-- Users have:
  -- Name, email, pssword, accounts
  -- Accounts: Github, Twitter, Facebook, Linkedin, Instagram, gmail 

create table users (
  id serial primary key,
  name varchar(50) not null ,
  email varchar(50) not null unique,
  password varchar(100) not null,
  github_id varchar(20),
  facebook_id varchar(20),
  twitter_id varchar(20),
  linkedin_id varchar(20),
  instagram_id varchar(20),
  email_id varchar(20),
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