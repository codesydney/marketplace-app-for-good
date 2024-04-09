-- SERVICE PROVIDERS
create table public.service_providers (
  user_id           uuid references users not null primary key,
  name              text not null,
  slug              text not null,
  profile_image_url text,
  cover_image_url   text,
  abn               text not null,
  acn               text,

  foreign key (user_id) references auth.users(id)
);

--- Add index on slug since this will be used to look up service providers
create index service_providers_slug_idx on public.service_providers (slug);
