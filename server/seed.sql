insert into users
  (name, email, password)
  values
    ('lorenzo', 'lorenzo@mail.com', 'password');

insert into boards
  (name, isDefault, user_id)
  values  
    ('board 1', true, 1),
    ('board 2', false, 1),
    ('board 3', false, 1);

insert into tiles
  (name)
  values 
    ('notes'),
    ('todos'),
    ('weather'),
    ('gmail'),
    ('trello'),
    ('indeed'),
    ('AlphaVantage'),
    ('CurrentsNews'),
    ('NYT'),
    ('Zomato'),
    ('SoundCloud'),
    ('TicketMaster'),
    ('Spotify'),
    ('Scores');

insert into board_tiles
  (index, board_id, tile_id)
  values
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 1, 4);

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
