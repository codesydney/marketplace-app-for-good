/*
  Setup initial row level security policies for the following tables:
  - stripe_users
  - service_providers
  - customers
*/

-- STRIPE USERS
alter table "stripe_users" enable row level security;

create policy "User can see their own stripe_users record only."
on stripe_users
for select using ( (select auth.uid()) = user_id );


-- SERVICE PROVIDERS
alter table "service_providers" enable row level security;

create policy "Users can create a Service Provider profile."
on service_providers for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Service Providers profiles are viewable by everyone"
on service_providers for select
to authenticated, anon
using ( true );

create policy "User can update their own Service Provider profile only."
on service_providers
for update using ( (select auth.uid()) = user_id );


-- CUSTOMERS
alter table "customers" enable row level security;

create policy "user can create a Customer profile."
on customers for insert
to authenticated
with check ( (select auth.uid()) = user_id );


create policy "Customer profiles are viewable by everyone"
on customers for select
to authenticated, anon
using ( true );

create policy "User can update their own Customer profile only."
on customers
for update using ( (select auth.uid()) = user_id );

