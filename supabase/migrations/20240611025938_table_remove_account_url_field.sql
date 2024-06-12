/*
  Remove the account_url field from the stripe_users table as we can
  re-generate the URL when needed.
*/

ALTER TABLE stripe_users
DROP COLUMN account_url;
