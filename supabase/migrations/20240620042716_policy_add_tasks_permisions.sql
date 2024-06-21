alter table tasks enable row level security;

create policy "anyone can view tasks"
on tasks for select
to authenticated, anon
using ( true );

create policy "customer user can create a new task"
on tasks for insert
to authenticated
with check ( (select auth.uid()) = customer_id );

create policy "customer user can update their own tasks"
on tasks for update
to authenticated
using ( (select auth.uid()) = customer_id );
