/*
  This migration adds a trigger that fires a webhook event when a 
  public user is created.

  Supabase will send the entire row contents in webhooks, so firing on
  the new public user records prevents sensistive information from 
  being leaked (e.g. emails, name).

  The API endpoint is set to localhost for local development.
  
  This endpoint can be updated in the Supabase dashboard.
 */
create
or replace trigger "on_new_public_user"
after
  insert on public.users 
for each row
execute
  function "supabase_functions"."http_request" (
    'http://localhost:3000/api/v1/webhooks/users',
    'POST',
    '{"Content-type":"application/json"}',
    '{}',
    '1000'
  );
