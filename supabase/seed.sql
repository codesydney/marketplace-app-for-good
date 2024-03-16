BEGIN TRANSACTION;

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES 
  ('00000000-0000-0000-0000-000000000000', '5004a761-60f9-4f57-ab5e-6a94df5d2177', 'authenticated', 'authenticated', 'provider@email.com',  extensions.crypt('password', extensions.gen_salt('bf')), timezone('utc'::text, now()), NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{ "roles": {"provider": true} }', NULL, timezone('utc'::text, now()), timezone('utc'::text, now()), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', '00c89a1b-9c9c-41d5-9b42-60a79b748194', 'authenticated', 'authenticated', 'customer@email.com',  extensions.crypt('password', extensions.gen_salt('bf')), timezone('utc'::text, now()), NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{ "roles": {"provider": true} }', NULL, timezone('utc'::text, now()), timezone('utc'::text, now()), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id, provider_id, user_id,identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES 
  ('f1fa0569-bd45-4462-83df-189b0efb3e09', '5004a761-60f9-4f57-ab5e-6a94df5d2177', '5004a761-60f9-4f57-ab5e-6a94df5d2177'::uuid, '{"sub": "5004a761-60f9-4f57-ab5e-6a94df5d2177"}', 'email', timezone('utc'::text, now()), timezone('utc'::text, now()), timezone('utc'::text, now())),
  ('8cb4030c-e973-4955-9401-69fe91b9682a', '00c89a1b-9c9c-41d5-9b42-60a79b748194', '00c89a1b-9c9c-41d5-9b42-60a79b748194'::uuid, '{"sub": "00c89a1b-9c9c-41d5-9b42-60a79b748194"}', 'email', timezone('utc'::text, now()), timezone('utc'::text, now()), timezone('utc'::text, now()));

INSERT INTO public.users (id)
VALUES
  ('5004a761-60f9-4f57-ab5e-6a94df5d2177'),
  ('00c89a1b-9c9c-41d5-9b42-60a79b748194');

INSERT INTO service_providers (user_id, preferred_name, profile_picture)
VALUES 
  ('5004a761-60f9-4f57-ab5e-6a94df5d2177', 'Sam', 'https://randomuser.me/api/portraits/men/92.jpg');

INSERT INTO customers (user_id, preferred_name, profile_picture)
VALUES
  ('00c89a1b-9c9c-41d5-9b42-60a79b748194', 'John', 'https://randomuser.me/api/portraits/men/93.jpg');

INSERT INTO tasks (id, customer_id)
VALUES
  ('d8d504f6-57ed-4e97-b5c4-31454b366324', '00c89a1b-9c9c-41d5-9b42-60a79b748194');

INSERT INTO quotes (id, service_provider_id)
VALUES
  ('b656f635-6a98-43e5-8f5c-c9238b133e31', '5004a761-60f9-4f57-ab5e-6a94df5d2177');

INSERT INTO threads (id, service_provider_id, customer_id)
VALUES
  ('1e2ab0e9-8bf2-4a58-b258-08a3ec3a50fe', '5004a761-60f9-4f57-ab5e-6a94df5d2177', '00c89a1b-9c9c-41d5-9b42-60a79b748194');

INSERT INTO messages (thread_id, sender_id, recipient_id, content, sent_at)
VALUES
  ('1e2ab0e9-8bf2-4a58-b258-08a3ec3a50fe', '5004a761-60f9-4f57-ab5e-6a94df5d2177', '00c89a1b-9c9c-41d5-9b42-60a79b748194', 'Hello, I am clean this for $200.', timezone('utc'::text, now()));

COMMIT;
