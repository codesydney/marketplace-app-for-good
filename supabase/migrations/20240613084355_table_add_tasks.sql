create type task_status_enum AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
create type task_due_date_type_enum AS ENUM ('ON_DATE', 'BEFORE_DATE');

create table tasks (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) not null,
  address_id uuid references addresses(id) not null,
  title text not null,
  description text not null,
  budget numeric not null,
  status task_status_enum not null default 'OPEN',
  due_date date not null,
  due_date_type task_due_date_type_enum not null default 'BEFORE_DATE',
  suburb text not null,
  postcode text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
