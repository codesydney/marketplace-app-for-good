/*
  This migration defines a function to update the onboarding status fields on both the stripe_users and service_providers tables.
  Updates to both rows are implicitly wrapped in a transaction, so if one update fails, the other will be rolled back.

  The main onboarding source of truth is on the stripe_users table. This is used to flag a user's onboarding status with Stripe.

  On the service_providers table, we use an indexed onboarding_status field to hide non-onboarded providers from our search results.
*/

create or replace function update_service_provider_onboarding(p_user_id uuid, p_onboarding_status boolean)
returns void as $$
begin
  update stripe_users
  set onboarded = p_onboarding_status
  where user_id = p_user_id and type = 'SERVICE_PROVIDER';

  update service_providers
  set onboarding_status = p_onboarding_status
  where user_id = p_user_id;
end;
$$ language plpgsql;

