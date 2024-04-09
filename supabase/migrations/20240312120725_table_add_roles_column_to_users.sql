alter table public.users
add column roles text[] default '{customer}'
