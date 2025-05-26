-- CREATE TABLE events (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   title VARCHAR(255) NOT NULL,
--   description TEXT,
--   location VARCHAR(100),
--   date DATETIME,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE registrations (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   event_id INT,
--   name VARCHAR(100),
--   email VARCHAR(100),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (event_id) REFERENCES events(id)
-- );

-- schema.sql for sqlite compatibility

CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);


-- Inserting Sample Events
INSERT INTO events (title, description, location, date) VALUES
('Next.js Workshop', 'A deep dive into Next.js fundamentals and advanced features.', 'Online', '2025-06-15 10:00:00'),
('Frontend Meetup', 'Frontend devs gather to discuss React, Vue, and more.', 'Delhi, India', '2025-06-20 18:00:00'),
('Tech Careers Panel', 'Industry professionals share their career journeys.', 'Dehradun, Uttarakhand, India', '2025-06-25 16:00:00'),
('GraphQL Bootcamp', 'Learn GraphQL from scratch in a one-day bootcamp.', 'Online', '2025-06-30 09:00:00'),
('AI & ML Hackathon', 'Join teams to build ML-powered apps over the weekend.', 'Noida, UP', '2025-07-05 08:00:00');