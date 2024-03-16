CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL PRIMARY KEY,

  FOREIGN KEY (id) REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS customers (
  user_id         uuid not null primary key,
  preferred_name  text not null,
  profile_picture text,

  FOREIGN KEY (user_id) REFERENCES public.users(id)

);

CREATE TABLE IF NOT EXISTS service_providers (
  user_id         uuid not null primary key,
  preferred_name  text not null,
  profile_picture text,

  FOREIGN KEY (user_id) REFERENCES public.users(id)
);