insert into users
  (name, email, password)
  values
    ('lorenzo', 'lorenzo@mail.com', 'password');

insert into tiles
  (name)
  values 
    ('notes'),
    ('todos'),
    ('weather'),
    ('news'),
    ('github'),
    ('twitter'),
    ('linkedin'),
    ('spotify'),
    ('reddit'),
    ('amazon'),
    ('google'),
    ('soundcloud');

insert into user_tiles
  (index,login, user_id, tile_id)
  values
  (1, '',1, 1),
  (2, '',1, 2),
  (3, '',1, 3),
  (4, '',1, 4);

  -- insert into accounts
  -- (name)
  -- values 
  --   ('github'),
  -- ('facebook'),
  -- ('twitter'),
  -- ('linkedin'),
  -- ('instagram'),
  -- ('spotify'),
  -- ('reddit'),
  -- ('soundcloud'),
  -- amazon_id varchar(30),
  -- email_id varchar(30))
