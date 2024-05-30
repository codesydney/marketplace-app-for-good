-- WIP Table Schema
CREATE TABLE IF NOT EXISTS customers (
  user_id         uuid not null primary key,
  preferred_name  text not null,
  fullname       text not null,
  profile_picture text,

  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
