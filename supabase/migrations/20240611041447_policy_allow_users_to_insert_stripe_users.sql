-- Add a policy to allow users to insert a stripe_users record which stores the Stripe IDs and onboarding statuses of users.
create policy "User can create a stripe_user record"
on stripe_users for insert
to authenticated
with check ( (select auth.uid()) = user_id );
