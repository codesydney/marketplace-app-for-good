-- SERVICE PROVIDER PROFILES
create table public.service_provider_descriptions (
  service_provider_id uuid not null primary key,
  "description"       text not null,

  foreign key (service_provider_id) references public.service_providers(user_id)
);
