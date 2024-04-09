-- PUBLIC USERS table
create table public.users (
  id                  uuid not null primary key,
  stripe_customer_id  text,
  stripe_account_id   text,

  foreign key (id) references auth.users(id)
);
comment on column public.users.stripe_account_id is 'Stripe Connect account id for service providers.';

-- restrict access to users only
alter table public.users
  enable row level security;

create policy "Can view own user data." on public.users
  for select using (auth.uid() = id);
create policy "Can update own user data." on public.users
  for update using (auth.uid() = id);

