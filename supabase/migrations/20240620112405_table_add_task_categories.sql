create table task_categories (
  id serial PRIMARY KEY,
  name text NOT NULL
);

alter table tasks
add column task_category_id integer references task_categories(id) not null;

create index tasks_task_categories_id_fkey on tasks(task_category_id);
