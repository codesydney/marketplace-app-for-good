alter table task_categories enable row level security;

create policy "anyone can view task_categories"
on task_categories for select
to authenticated, anon
using ( true );
