CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users
(
  uid UUID DEFAULT uuid_generate_v4() NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  nickname VARCHAR(30) NOT NULL,
  PRIMARY KEY (uid)
);

CREATE TABLE Tags
(
  id INTEGER NOT NULL,
  creator UUID NOT NULL REFERENCES Users(uid),
  name VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE UsersTags
(
  taggedUser UUID NOT NULL REFERENCES Users(uid),
  tag INTEGER NOT NULL REFERENCES Tags(id),
  PRIMARY KEY (taggedUser, tag)
);