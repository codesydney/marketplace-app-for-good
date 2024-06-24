create type aus_state_enum AS ENUM ('NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT');

create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  address_line_1 text not null,
  address_line_2 text,
  suburb text not null,
  state aus_state_enum not null,
  postcode text not null,
  country text not null
);

create index addresses_user_id_fkey on addresses(user_id);
