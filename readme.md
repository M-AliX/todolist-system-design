# Problem Statement

We want to build a todo lists backend web service. to allow users to manage todo lists as the following:
- user can create/edit/delete todo lists and view all the todo lists he has 
- user can change the order of his todo lists or choose a priority for the todo list between (low, medium, high)
- user can create/edit/delete tasks in a certain todo list, or mark a task as 'done'
- user can change the order of his todo list tasks or choose a priority for the task between (low, medium, high)
- user can have multiple subtasks for a task in a certain todo list

# First Solution

`todo_api.js` and `todo_dm` represent the first iteration of the solution to the problem

# Second Solution

`todo_api_2.js` and `todo_dm_2` represent the second iteration of the solution to the problem

General changes made:
- POST, PUT, and DELETE requests now return the state as well (rather than just the entity)
- Fixed `<table_name>_id` to `id_<table_name>` in DM
- Renamed `super_task_id` to `parent_task_id` for clarity
- Add `code` to DM and body of API calls for distributed systems
- Renamed tables in DM to camelCase