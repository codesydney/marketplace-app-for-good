-- SERVICE PROVIDERS
create table public.service_providers (
  user_id           uuid not null primary key,
  company_name      text not null,
  abn               text not null,
  acn               text,
  industry          text not null,
  preferred_name    text not null,
  fullname          text not null,

  profile_image_url text,
  cover_image_url   text,
  slug              text not null unique,

  foreign key (user_id) references auth.users(id)
);

--- Add index on slug since this will be used to look up service providers
create index service_providers_slug_idx on public.service_providers (slug);
