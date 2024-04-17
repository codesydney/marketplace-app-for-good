-- Create a new public user when an auth user is created
create
or replace function public.handle_new_user () returns trigger language plpgsql security definer
set
  search_path = public as $$
begin
  insert into public.users (id, role)
  values (new.id, (new.raw_user_meta_data ->> 'role')::user_role);
  return new;
end;
$$;

create
or replace trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user();
