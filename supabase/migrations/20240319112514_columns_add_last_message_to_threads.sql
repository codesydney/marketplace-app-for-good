ALTER TABLE threads 
  ADD COLUMN last_message_id integer REFERENCES messages(id) ON DELETE SET NULL;

-- Create a trigger function
CREATE OR REPLACE FUNCTION update_last_message_id()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE threads
  SET last_message_id = NEW.id
  WHERE id = NEW.thread_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the messages table
CREATE TRIGGER update_last_message_trigger
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION update_last_message_id();
