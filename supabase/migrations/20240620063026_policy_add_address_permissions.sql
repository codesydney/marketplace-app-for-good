alter table addresses enable row level security;

create policy "User can create addresses"
on addresses for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "User can see their own addresses"
on addresses
for select using ( (select auth.uid()) = user_id );

create policy "User can update their own addresses only"
on addresses
for update using ( (select auth.uid()) = user_id );
