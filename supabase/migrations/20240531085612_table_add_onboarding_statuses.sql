CREATE TYPE user_type_enum AS ENUM ('SERVICE_PROVIDER', 'CUSTOMER');

CREATE TABLE IF NOT EXISTS stripe_users (
  id TEXT NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL,
  type user_type_enum NOT NULL,
  onboarded BOOLEAN NOT NULL DEFAULT FALSE,
  account_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TRIGGER handle_stripe_users_updated_at BEFORE UPDATE ON stripe_users
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

COMMENT ON COLUMN stripe_users.account_url IS 'Service Providers Only: Stripe Connect Account Onboarding URL.';
COMMENT ON COLUMN stripe_users.id IS 'Stripe Customer ID for Customers, and Stripe Connect Account ID for Service Providers';
