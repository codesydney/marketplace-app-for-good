create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  address_line_1 text not null,
  address_line_2 text,
  suburb text not null,
  postal_code text not null,
  country text not null
);
