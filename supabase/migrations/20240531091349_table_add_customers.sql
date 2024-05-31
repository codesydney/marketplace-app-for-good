-- WIP Table Schema
CREATE TABLE IF NOT EXISTS customers (
  user_id         uuid not null primary key,
  preferred_name  text not null,
  fullname        text not null,
  profile_picture text,

  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),

  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TRIGGER handle_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
