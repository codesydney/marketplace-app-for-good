create table task_categories (
  id serial PRIMARY KEY,
  name text NOT NULL
);

alter table tasks
add column task_categories_id integer references task_categories(id) not null;
