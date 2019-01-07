insert into users
  (name, email, password)
  values
    ('lorenzo', 'lorenzo@mail.com', 'password'),
    ('lore', 'lore@email.com', '$2b$10$NfOU.27GV2a9.HvS3oaJHObMjO8kAOdDB5DYbUSGPgiX3GO/wht56');

insert into boards
  (name, isDefault, user_id)
  values  
    ('board 1', true, 2),
    ('board 2', false, 2),
    ('board 3', false, 2);

insert into tiles
  (name)
  values 
    ('notes'),
    ('todos'),
    ('weather'),
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
  (4, 1, 4),
  (1, 2, 5),
  (2, 2, 6),
  (3, 2, 7),
  (4, 2, 8),
  (1, 3, 4),
  (2, 3, 3),
  (3, 3, 1);

insert into events
  (title, start)
  

