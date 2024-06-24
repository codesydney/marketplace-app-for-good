SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'e1c17344-5139-4a46-bd6c-f8511d9bb28d', '{"action":"user_signedup","actor_id":"db504299-b45e-4879-abe6-3b426590ac5a","actor_username":"john.smith@email.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-06-12 07:29:15.04784+00', ''),
	('00000000-0000-0000-0000-000000000000', '782e4168-ca93-4cdf-b31c-a39112156ec7', '{"action":"login","actor_id":"db504299-b45e-4879-abe6-3b426590ac5a","actor_username":"john.smith@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-12 07:29:15.049372+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e41a37ae-0d31-4e0f-a5b3-fe0c6f8398b3', '{"action":"user_signedup","actor_id":"77fe1888-3b4e-4b7a-af14-a204fad0ae99","actor_username":"jim.smith@email.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-06-12 07:29:43.057692+00', ''),
	('00000000-0000-0000-0000-000000000000', '90e301f0-d70c-451d-ab36-9cdbb33387b5', '{"action":"login","actor_id":"77fe1888-3b4e-4b7a-af14-a204fad0ae99","actor_username":"jim.smith@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-12 07:29:43.059097+00', ''),
	('00000000-0000-0000-0000-000000000000', '34e624bc-505f-42b9-9012-ec65d2416d45', '{"action":"login","actor_id":"db504299-b45e-4879-abe6-3b426590ac5a","actor_username":"john.smith@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 05:02:50.789361+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '5004a761-60f9-4f57-ab5e-6a94df5d2177', 'authenticated', 'authenticated', 'provider@email.com', '$2a$06$VzadxtFx385ShhihF8/aHetjBC6fNxBtKYnXQmGDkaI5FqAxawd4u', '2024-06-12 05:35:59.620643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"role": "ServiceProvider"}', NULL, '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00c89a1b-9c9c-41d5-9b42-60a79b748194', 'authenticated', 'authenticated', 'customer@email.com', '$2a$06$etnFK66bSrqbQqdKkQ8.uOkQPzt10hr8PnQwRV3IiArJQImL69MrK', '2024-06-12 05:35:59.620643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"role": "Customer"}', NULL, '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3b3f2374-0b2d-4fa5-a860-41ddfbb21c1c', 'authenticated', 'authenticated', 'customer2@email.com', '$2a$06$XS2U40bCa1a45GfOJnUkP.4EHdv2vtzJ5AXLDF4akqTndEHJRPLk.', '2024-06-12 05:35:59.620643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"role": "Customer"}', NULL, '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '77fe1888-3b4e-4b7a-af14-a204fad0ae99', 'authenticated', 'authenticated', 'jim.smith@email.com', '$2a$10$H/z2DDzMfwhK30EzlxgGGeNBS7rU0Hd2daHUPXHfiDo7Do9xTP0.W', '2024-06-12 07:29:43.057998+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-06-12 07:29:43.059443+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "77fe1888-3b4e-4b7a-af14-a204fad0ae99", "role": "service-provider", "email": "jim.smith@email.com", "onboarded": false, "email_verified": false, "phone_verified": false, "preferred_name": "Jim"}', NULL, '2024-06-12 07:29:43.054715+00', '2024-06-12 07:29:43.060538+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'db504299-b45e-4879-abe6-3b426590ac5a', 'authenticated', 'authenticated', 'john.smith@email.com', '$2a$10$lyzx7cuf5bpFCmzUoyEn8eqt.d7hVufaVFNCTp6S5rTvceOO1Prri', '2024-06-12 07:29:15.048359+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-06-21 05:02:50.789976+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "db504299-b45e-4879-abe6-3b426590ac5a", "role": "customer", "email": "john.smith@email.com", "onboarded": true, "email_verified": false, "phone_verified": false, "preferred_name": "John"}', NULL, '2024-06-12 07:29:15.044081+00', '2024-06-21 05:02:50.791972+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('5004a761-60f9-4f57-ab5e-6a94df5d2177', '5004a761-60f9-4f57-ab5e-6a94df5d2177', '{"sub": "5004a761-60f9-4f57-ab5e-6a94df5d2177"}', 'email', '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', 'f1fa0569-bd45-4462-83df-189b0efb3e09'),
	('00c89a1b-9c9c-41d5-9b42-60a79b748194', '00c89a1b-9c9c-41d5-9b42-60a79b748194', '{"sub": "00c89a1b-9c9c-41d5-9b42-60a79b748194"}', 'email', '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', '8cb4030c-e973-4955-9401-69fe91b9682a'),
	('3b3f2374-0b2d-4fa5-a860-41ddfbb21c1c', '3b3f2374-0b2d-4fa5-a860-41ddfbb21c1c', '{"sub": "3b3f2374-0b2d-4fa5-a860-41ddfbb21c1c"}', 'email', '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', '2024-06-12 05:35:59.620643+00', '6241c710-8f35-456e-8ef0-5ebb65959b06'),
	('db504299-b45e-4879-abe6-3b426590ac5a', 'db504299-b45e-4879-abe6-3b426590ac5a', '{"sub": "db504299-b45e-4879-abe6-3b426590ac5a", "role": "customer", "email": "john.smith@email.com", "onboarded": true, "email_verified": false, "phone_verified": false, "preferred_name": "John"}', 'email', '2024-06-12 07:29:15.046262+00', '2024-06-12 07:29:15.046315+00', '2024-06-12 07:29:15.046315+00', 'f9a2f946-0d34-4a4f-94a4-8cba3783cd5f'),
	('77fe1888-3b4e-4b7a-af14-a204fad0ae99', '77fe1888-3b4e-4b7a-af14-a204fad0ae99', '{"sub": "77fe1888-3b4e-4b7a-af14-a204fad0ae99", "role": "service-provider", "email": "jim.smith@email.com", "onboarded": false, "email_verified": false, "phone_verified": false, "preferred_name": "Jim"}', 'email', '2024-06-12 07:29:43.056106+00', '2024-06-12 07:29:43.056135+00', '2024-06-12 07:29:43.056135+00', '41617d49-9a6a-4ea8-a8ec-83e96e48ac3f');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('88ae49a4-c997-4241-9da7-9c87df8b12f9', 'db504299-b45e-4879-abe6-3b426590ac5a', '2024-06-12 07:29:15.049696+00', '2024-06-12 07:29:15.049696+00', NULL, 'aal1', NULL, NULL, 'node', '172.28.0.1', NULL),
	('79b9f779-8aa7-4683-a2c6-9184187bf45f', '77fe1888-3b4e-4b7a-af14-a204fad0ae99', '2024-06-12 07:29:43.059497+00', '2024-06-12 07:29:43.059497+00', NULL, 'aal1', NULL, NULL, 'node', '172.28.0.1', NULL),
	('01b1b667-fb77-4ada-acc0-4d71b9634f6d', 'db504299-b45e-4879-abe6-3b426590ac5a', '2024-06-21 05:02:50.790036+00', '2024-06-21 05:02:50.790036+00', NULL, 'aal1', NULL, NULL, 'node', '172.26.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('88ae49a4-c997-4241-9da7-9c87df8b12f9', '2024-06-12 07:29:15.051807+00', '2024-06-12 07:29:15.051807+00', 'password', '5b47183b-a84b-40ef-b938-fae6e005a861'),
	('79b9f779-8aa7-4683-a2c6-9184187bf45f', '2024-06-12 07:29:43.060748+00', '2024-06-12 07:29:43.060748+00', 'password', '5f8d02b1-0367-4967-80f7-b1265f894550'),
	('01b1b667-fb77-4ada-acc0-4d71b9634f6d', '2024-06-21 05:02:50.792618+00', '2024-06-21 05:02:50.792618+00', 'password', '7706076e-e7dd-4948-887a-458e8938f313');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'I_2xGSP-mSskfYVovwL1TQ', 'db504299-b45e-4879-abe6-3b426590ac5a', false, '2024-06-12 07:29:15.050473+00', '2024-06-12 07:29:15.050473+00', NULL, '88ae49a4-c997-4241-9da7-9c87df8b12f9'),
	('00000000-0000-0000-0000-000000000000', 2, 'tnpKDFJIt0l6apZye7jfjg', '77fe1888-3b4e-4b7a-af14-a204fad0ae99', false, '2024-06-12 07:29:43.059974+00', '2024-06-12 07:29:43.059974+00', NULL, '79b9f779-8aa7-4683-a2c6-9184187bf45f'),
	('00000000-0000-0000-0000-000000000000', 3, 'PD2NNO6O-rfU6X5GGKdT6g', 'db504299-b45e-4879-abe6-3b426590ac5a', false, '2024-06-21 05:02:50.790919+00', '2024-06-21 05:02:50.790919+00', NULL, '01b1b667-fb77-4ada-acc0-4d71b9634f6d');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."addresses" ("id", "user_id", "address_line_1", "address_line_2", "suburb", "state", "postcode", "country") VALUES
	('bf99c3a1-670a-4e72-b3ed-1188c34c6b20', 'db504299-b45e-4879-abe6-3b426590ac5a', '123 George Street', 'Suite 45', 'Sydney', 'NSW', '2000', 'Australia'),
	('d6384966-8e9b-4115-984e-35baca02d85d', 'db504299-b45e-4879-abe6-3b426590ac5a', '456 Collins Street', 'Apt 12B', 'Melbourne', 'VIC', '3000', 'Australia'),
	('90074ab9-518a-4a91-9ac5-f07dba8c6c34', 'db504299-b45e-4879-abe6-3b426590ac5a', '789 Queen Street', NULL, 'Brisbane', 'QLD', '4000', 'Australia'),
	('23da2644-fc8c-4710-99cf-0e6352544987', 'db504299-b45e-4879-abe6-3b426590ac5a', '101 North Terrace', 'Floor 2', 'Adelaide', 'SA', '5000', 'Australia'),
	('f588c3e5-79f6-41db-accf-6f5abab6b388', 'db504299-b45e-4879-abe6-3b426590ac5a', '202 Murray Street', NULL, 'Perth', 'WA', '6000', 'Australia');

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."customers" ("user_id", "preferred_name", "fullname", "profile_picture", "created_at", "updated_at") VALUES
	('db504299-b45e-4879-abe6-3b426590ac5a', 'John', 'John Smith', NULL, '2024-06-12 07:29:15.071926+00', '2024-06-12 07:29:15.071926+00');


--
-- Data for Name: service_providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."service_providers" ("user_id", "company_name", "abn", "acn", "industry", "preferred_name", "fullname", "profile_image_url", "cover_image_url", "slug", "created_at", "updated_at", "onboarding_status") VALUES
	('77fe1888-3b4e-4b7a-af14-a204fad0ae99', 'Jim''s Mowing', '12345345345', '123123123', 'Lawnmowing', 'Jim', 'Jim Smith', NULL, NULL, 'jims-mowing', '2024-06-12 07:29:43.066135+00', '2024-06-12 07:29:43.066135+00', false);


--
-- Data for Name: stripe_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."stripe_users" ("id", "user_id", "type", "onboarded", "created_at", "updated_at") VALUES
	('cus_QHKGPseOXdDaEM', 'db504299-b45e-4879-abe6-3b426590ac5a', 'CUSTOMER', true, '2024-06-12 07:29:15.079997+00', '2024-06-12 07:29:15.079997+00'),
	('acct_1PQlcpI7CwI20ZAy', '77fe1888-3b4e-4b7a-af14-a204fad0ae99', 'SERVICE_PROVIDER', false, '2024-06-12 07:29:45.052008+00', '2024-06-12 07:29:45.052008+00');


--
-- Data for Name: task_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."task_categories" ("id", "name") VALUES
	(1, 'Other'),
	(2, 'Plumbing'),
	(3, 'Electrical'),
	(4, 'Air Conditioning'),
	(5, 'Cleaning'),
	(6, 'Painting'),
	(8, 'Appliance Repair'),
	(10, 'Handyman / General Contracting'),
	(11, 'Glass Repair & Replacement'),
	(7, 'Landscaping & Gardening'),
	(9, 'Roofing');


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tasks" ("id", "customer_id", "address_id", "title", "description", "budget", "status", "due_date", "due_date_type", "suburb", "postcode", "created_at", "updated_at", "task_category_id") VALUES
	('4c4faf6c-e011-4a67-8059-60cf9310ae53', 'db504299-b45e-4879-abe6-3b426590ac5a', 'd6384966-8e9b-4115-984e-35baca02d85d', 'Repair fence', 'Fix the broken fence in the backyard', 250.00, 'OPEN', '2024-07-25', 'ON_DATE', 'Sydney', '2000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 10),
	('42501d1a-3749-4c19-ba14-c63bf9723dfd', 'db504299-b45e-4879-abe6-3b426590ac5a', 'd6384966-8e9b-4115-984e-35baca02d85d', 'Install shelves', 'Install new shelves in the garage', 180.00, 'OPEN', '2024-08-10', 'BEFORE_DATE', 'Adelaide', '5000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 10),
	('85f0fbd2-8c29-40cf-8101-f265ce96360a', 'db504299-b45e-4879-abe6-3b426590ac5a', 'd6384966-8e9b-4115-984e-35baca02d85d', 'Clean gutters', 'Need to clean the gutters before the rainy season', 200.00, 'OPEN', '2024-07-20', 'BEFORE_DATE', 'Perth', '6000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 9),
	('0692febf-4fe7-41cc-a83d-433d4c8a571a', 'db504299-b45e-4879-abe6-3b426590ac5a', 'f588c3e5-79f6-41db-accf-6f5abab6b388', 'Paint living room', 'Living room needs a fresh coat of paint', 500.00, 'OPEN', '2024-07-05', 'BEFORE_DATE', 'Melbourne', '3000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 6),
	('f5ab2cc2-9671-4b72-86e7-9e5cd068ae32', 'db504299-b45e-4879-abe6-3b426590ac5a', 'bf99c3a1-670a-4e72-b3ed-1188c34c6b20', 'Unclog drain', 'Clogged drain in the bathroom', 120.00, 'OPEN', '2024-08-05', 'ON_DATE', 'Brisbane', '4000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 2),
	('110a7973-2a17-4f71-8e7c-7704a0999fab', 'db504299-b45e-4879-abe6-3b426590ac5a', '23da2644-fc8c-4710-99cf-0e6352544987', 'Replace broken window', 'Replace broken window in the bedroom', 300.00, 'OPEN', '2024-07-15', 'ON_DATE', 'Adelaide', '5000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 11),
	('5dbdb602-2f5a-471f-a1b2-29bc82493be7', 'db504299-b45e-4879-abe6-3b426590ac5a', '90074ab9-518a-4a91-9ac5-f07dba8c6c34', 'Install new light fixture', 'New light fixture installation in the dining area', 150.00, 'OPEN', '2024-07-10', 'BEFORE_DATE', 'Brisbane', '4000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 3),
	('6b5aa411-c387-47b4-b7fb-5a47fb430ec4', 'db504299-b45e-4879-abe6-3b426590ac5a', 'bf99c3a1-670a-4e72-b3ed-1188c34c6b20', 'Fix leaking tap', 'Leaking tap in the kitchen needs fixing', 100.00, 'OPEN', '2024-07-01', 'ON_DATE', 'Sydney', '2000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 2),
	('6a58168d-fcda-4767-a5ba-5b0fdfcef343', 'db504299-b45e-4879-abe6-3b426590ac5a', 'bf99c3a1-670a-4e72-b3ed-1188c34c6b20', 'Trim hedges', 'Trim the hedges along the driveway', 90.00, 'OPEN', '2024-08-15', 'BEFORE_DATE', 'Perth', '6000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 7),
	('98f049aa-898a-4f5b-8695-8a31814432d4', 'db504299-b45e-4879-abe6-3b426590ac5a', 'bf99c3a1-670a-4e72-b3ed-1188c34c6b20', 'Mow the lawn', 'Front yard lawn needs mowing', 75.00, 'OPEN', '2024-07-30', 'BEFORE_DATE', 'Melbourne', '3000', '2024-06-21 05:01:57.44965+00', '2024-06-21 05:01:57.44965+00', 7);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 3, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: task_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."task_categories_id_seq"', 11, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
