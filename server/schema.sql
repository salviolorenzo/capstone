-- Users have:
  -- Name, email, pssword, accounts
  -- Accounts: Github, Twitter, Facebook, Linkedin, Instagram, gmail 

create table users (
  id serial primary key,
  name varchar(50) not null ,
  email varchar(50) not null unique,
  password varchar(100) not null
);

create table boards(
  id serial primary key,
  name text,
  isDefault boolean,
  user_id integer references users(id)
);

create table tiles(
  id serial primary key,
  name text,
  content text
);

create table preferences(
  id serial primary key,
  name text, 
  content text
);

-- create table accounts(
--   id serial primary key, 
--   name text
-- );

-- Linking Tables
-- create table user_tiles(
--   id serial primary key,
--   index integer,
--   login text,
--   user_id integer references users(id),
--   tile_id integer references tiles(id)  
-- );

create table user_preferences(
  id serial primary key,
  user_id integer references users(id),
  preferences_id integer references preferences(id)  
);

create table board_tiles(
  id serial primary key,
  index integer,
  board_id integer references boards(id),
  tile_id integer references tiles(id)
);

-- create table user_accounts(
--   id serial primary key,
--   user_id integer references users(id),
--   account_id integer references accounts(id)
-- );