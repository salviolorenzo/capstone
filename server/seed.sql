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

insert into preferences
  (type)
  values
  ('background'),
  ('news_source');

insert into user_preferences
  (user_id, pref_id, term)
  values
  (2, 1, 'sky'),
  (2, 2, 'CNN');

insert into events
  (title, allDay, eventStart, eventEnd, description, user_id)
  values
    ('Lunch Meeting', false, 'January 8, 2019 11:30:00', 'January 8, 2019 13:30:00', 'Lunch with John', 2),
    ('Sales Meeting', false, 'January 8, 2019 9:30:00', 'January 8, 2019 10:30:00', 'Meeting with new clients', 2),
    ('Sales Meeting', false, 'January 8, 2019 14:30:00', 'January 8, 2019 15:30:00', 'Meeting with new clients', 2),
    ('Sales Meeting', false, 'January 8, 2019 15:30:00', 'January 8, 2019 16:30:00', 'Meeting with new clients', 2),
    ('Staff Meeting', false, 'January 9, 2019 8:30:00', 'January 9, 2019 10:30:00', '', 2),
    ('Team Building Exercise', false, 'January 10, 2019 5:30:00', 'January 10, 2019 7:30:00', 'Team Workout', 2),
    ('Sales Event', false, 'January 11, 2019 9:30:00', 'January 11, 2019 12:30:00', 'Pitch meeting', 2),
    ('Lunch Meeting', false, 'January 12, 2019 11:30:00', 'January 12, 2019 13:30:00', 'Lunch with Marissa', 2),
    ('Lunch Meeting', false, 'January 14, 2019 11:30:00', 'January 14, 2019 13:30:00', 'Lunch with Jack', 2),
    ('Lunch Meeting', false, 'January 15, 2019 11:30:00', 'January 15, 2019 13:30:00', 'Lunch with John', 2),
    ('Sales Meeting', false, 'January 15, 2019 9:30:00', 'January 15, 2019 10:30:00', 'Meeting with new clients', 2),
    ('Sales Meeting', false, 'January 15, 2019 14:30:00', 'January 15, 2019 15:30:00', 'Meeting with new clients', 2),
    ('Sales Meeting', false, 'January 15, 2019 15:30:00', 'January 15, 2019 16:30:00', 'Meeting with new clients', 2),
    ('Staff Meeting', false, 'January 16, 2019 8:30:00', 'January 16, 2019 10:30:00', '', 2),
    ('Team Building Exercise', false, 'January 17, 2019 5:30:00', 'January 17, 2019 7:30:00', 'Team Workout', 2),
    ('Sales Event', false, 'January 18, 2019 9:30:00', 'January 18, 2019 12:30:00', 'Pitch meeting', 2),
    ('Lunch Meeting', false, 'January 18, 2019 11:30:00', 'January 18, 2019 13:30:00', 'Lunch with Marissa', 2),
    ('Lunch Meeting', false, 'January 21, 2019 11:30:00', 'January 21, 2019 13:30:00', 'Lunch with Jack', 2),
    ('Lunch Meeting', false, 'January 22, 2019 11:30:00', 'January 22, 2019 13:30:00', 'Lunch with John', 2),
    ('Sales Meeting', false, 'January 22, 2019 9:30:00', 'January 22, 2019 10:30:00', 'Meeting with new clients', 2),
    ('Sales Meeting', false, 'January 22, 2019 14:30:00', 'January 22, 2019 15:30:00', 'Meeting with new clients', 2),
    ('Sales Meeting', false, 'January 22, 2019 15:30:00', 'January 22, 2019 16:30:00', 'Meeting with new clients', 2),
    ('Staff Meeting', false, 'January 23, 2019 8:30:00', 'January 23, 2019 10:30:00', '', 2),
    ('Team Building Exercise', false, 'January 24, 2019 5:30:00', 'January 24, 2019 7:30:00', 'Team Workout', 2),
    ('Sales Event', false, 'January 25, 2019 9:30:00', 'January 25, 2019 12:30:00', 'Pitch meeting', 2),
    ('Lunch Meeting', false, 'January 25, 2019 11:30:00', 'January 25, 2019 13:30:00', 'Lunch with Marissa', 2),
    ('Lunch Meeting', false, 'January 26, 2019 11:30:00', 'January 26, 2019 13:30:00', 'Lunch with Jack', 2);
  

