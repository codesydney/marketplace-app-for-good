CREATE TABLE IF NOT EXISTS tasks (
  id uuid NOT NULL PRIMARY KEY,
  customer_id uuid NOT NULL,

  FOREIGN KEY (customer_id) REFERENCES customers(user_id)
);


CREATE TABLE IF NOT EXISTS quotes (
  id uuid NOT NULL PRIMARY KEY,
  service_provider_id uuid NOT NULL,

  FOREIGN KEY (service_provider_id) REFERENCES service_providers(user_id)
)