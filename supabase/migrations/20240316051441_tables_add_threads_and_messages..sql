CREATE TABLE IF NOT EXISTS threads (
  id uuid NOT NULL PRIMARY KEY,
  service_provider_id uuid NOT NULL,
  customer_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),

  FOREIGN KEY (service_provider_id) REFERENCES service_providers(user_id),
  FOREIGN KEY (customer_id) REFERENCES customers(user_id)
);

ALTER TABLE threads
  ENABLE ROW LEVEL SECURITY;

-- Customer Policies for threads
CREATE POLICY "Can view own customer threads" ON threads
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Can update own customer threads" ON threads
  FOR UPDATE USING (auth.uid() = customer_id);

-- Service Provider Policies for threads 
CREATE POLICY "Can view own service provider threads" ON threads
  FOR SELECT USING (auth.uid() = service_provider_id);
CREATE POLICY "Can update own service provider threads" ON threads
  FOR UPDATE USING (auth.uid() = service_provider_id);

CREATE TABLE IF NOT EXISTS messages (
  id serial NOT NULL PRIMARY KEY,
  thread_id uuid NOT NULL,
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  content text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT NOW(),
  status text NOT NULL DEFAULT 'unread',

  FOREIGN KEY (thread_id) REFERENCES threads(id),
  FOREIGN KEY (sender_id) REFERENCES public.users(id)
);

ALTER TABLE messages
  ENABLE ROW LEVEL SECURITY;

-- Sender Policies for messages
CREATE POLICY "Can view own sent messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id);
CREATE POLICY "Can update own sent messages" ON messages
  FOR UPDATE USING (auth.uid() = sender_id);
CREATE POLICY "Can create sent messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Recipient Policies for messages
CREATE POLICY "Can view own received messages" ON messages
  FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Can update own received messages" ON messages
  FOR UPDATE USING (auth.uid() = recipient_id);
