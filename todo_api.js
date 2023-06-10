// ASSUMMPTIONS
// 1. Subtasks can be assigned priorities as well
// 2. Authentication is implicit (in the cookies/tokens)
// 3. The order of a task is changed by re-inserting it after another task (or at the beginning of the list)

// CREATE LISTS

GET /lists
-> {
        [ 
            {list_id: 13, title: "Work", priority: "high", order: 1},
            {list_id: 14, title: "Home", priority: "low", order: 2},
            {list_id: 15, title: "List1", priority: "low", order: 3},
    ]
}

POST /lists
<- { title: "List2" }
-> {list_id: 16, title: "List2", priority: "low", order: 4}

POST /lists
<- { title: "List3", priority: "medium" }
-> {list_id: 17, title: "List3", priority: "medium", order: 5}

GET /lists
-> {
        [ 
            {list_id: 13, title: "Work", priority: "high", order: 1},
            {list_id: 14, title: "Home", priority: "low", order: 2},
            {list_id: 15, title: "List1", priority: "low", order: 3},
            {list_id: 16, title: "List2", priority: "low", order: 4},
            {list_id: 17, title: "List3", priority: "medium", order: 5},
    ]
}

// DELETE LISTS

DELETE /lists
<- {list_id: 15}
-> {}

GET /lists
-> {
        [ 
            {list_id: 13, title: "Work", priority: "high", order: 1},
            {list_id: 14, title: "Home", priority: "low", order: 2},
            {list_id: 16, title: "List2", priority: "low", order: 3},
            {list_id: 17, title: "List3", priority: "low", order: 4},
    ]
}

// Edit/Reorder LISTS

PUT /lists
<- { list_id: 13, priority: "medium", title: "Non-Urgent Work" }
-> { list_id: 13, priority: "medium", title: "Non-Urgent Work", order: 1 }

PUT /lists
<- { list_id: 17, priority: "low" }
-> {list_id: 17, title: "List3", priority: "low", order: 4}

GET /lists
-> {
        [ 
            {list_id: 13, title: "Non-Urgent Work", priority: "medium", order: 1},
            {list_id: 14, title: "Home", priority: "low", order: 2},
            {list_id: 16, title: "List2", priority: "low", order: 3},
            {list_id: 17, title: "List3", priority: "low", order: 4},
    ]
}
PUT /lists
<- { list_id: 13, insert_after: 3}
-> { list_id: 13, priority: "medium", title: "Non-Urgent Work", order: 4 }

GET /lists
-> {
        [ 
            {list_id: 14, title: "Home", priority: "low", order: 1},
            {list_id: 16, title: "List2", priority: "low", order: 2},
            {list_id: 13, title: "Non-Urgent Work", priority: "medium", order: 3},
            {list_id: 17, title: "List3", priority: "low", order: 4},
    ]
}

// CREATE TASKS

GET /lists/13
-> {
         title: "Work", priority: "high", list_id: 13,
         tasks: [ 
            {task_id: 37, title: "Submit Systems Design Assignment", priority: "high", order: 1},
            {task_id: 38, title: "Wake up", priority: "low", order: 2},
            {task_id: 39, title: "Some Task", priority: "low", order: 3},
            {task_id: 40, title: "Another Task", priority: "low", order: 4},
        ]
}


POST /lists/13/tasks
<- {title: "Another Another Task"}
-> {task_id: 41, title: "Another Another Task", priority: "low", order: 5},

GET /lists/13
-> {
         title: "Work", priority: "high", list_id: 13,
         tasks: [ 
            {task_id: 37, title: "Submit Systems Design Assignment", priority: "high", order: 1},
            {task_id: 38, title: "Wake up", priority: "low", order: 2},
            {task_id: 39, title: "Some Task", priority: "low", order: 3},
            {task_id: 40, title: "Another Task", priority: "low", order: 4},
            {task_id: 41, title: "Another Another Task", priority: "low", order: 5},
        ]
}

// CREATE SUBTASKS


GET /lists/13/tasks/38/subtasks
-> {
    []
}

POST /lists/13/tasks/38/subtasks
<- { title: "Set Alarm" }
-> {task_id: 42, title: "Set Alarm", priority: "low", order: 1}

POST /lists/13/tasks/38/subtasks
<- { title: "Clean Room" }
-> {task_id: 43, title: "Clean Room", priority: "low", order: 2}

GET /lists/13/tasks/38/subtasks
-> {
            [
                {task_id: 42, title: "Set Alarm", priority: "low", order: 1},
                {task_id: 43, title: "Clean Room", priority: "low", order: 2}
            ]
}


GET /lists/13
-> {
         title: "Work", priority: "high", list_id: 13,
         tasks: [ 
            {task_id: 37, title: "Submit Systems Design Assignment", priority: "high", order: 1},
            {task_id: 38, title: "Wake up", priority: "low", order: 2, sub_tasks: 
                [
                    {task_id: 42, title: "Set Alarm", priority: "low", order: 1},
                    {task_id: 43, title: "Clean Room", priority: "low", order: 2}
                ]
            },
            {task_id: 39, title: "Some Task", priority: "low", order: 3},
            {task_id: 40, title: "Another Task", priority: "low", order: 4},
            {task_id: 41, title: "Another Another Task", priority: "low", order: 5},
        ]
}

// EDIT/REORDER SUBTASKS

GET /lists/13/tasks/38/subtasks
-> {
            [
                {task_id: 42, title: "Set Alarm", priority: "low", order: 1},
                {task_id: 43, title: "Clean Room", priority: "low", order: 2}
            ]
}
PUT /lists/13/tasks
<- { task_id: 43, title: "Clean Apartment", priority: "medium", insert_after: 0}
-> {task_id: 43, title: "Clean Apartment", priority: "medium", order: 1}

GET /lists/13/tasks/38/subtasks
-> {
            [
                {task_id: 43, title: "Clean Apartment", priority: "medium", order: 1}
                {task_id: 42, title: "Set Alarm", priority: "low", order: 2},
            ]
}

// DELETE SUBTASKS

DELETE /lists/13/tasks
<- {task_id: 43}
-> {}

GET /lists/13/tasks/38/subtasks
<- {task_id: 43}
-> {
            [
                {task_id: 42, title: "Set Alarm", priority: "low", order: 2},
            ]
}


// DELETE TASKS

DELETE /lists/13/tasks
<- {task_id: 39}
-> {}

GET /lists/13
-> {
         title: "Work", priority: "high", list_id: 13,
         tasks: [ 
            {task_id: 37, title: "Submit Systems Design Assignment", priority: "high", order: 1},
            {task_id: 38, title: "Wake up", priority: "low", order: 2, sub_tasks: 
                [
                    {task_id: 42, title: "Set Alarm", priority: "low", order: 1},
                    {task_id: 43, title: "Clean Room", priority: "low", order: 2}
                ]
            },
            {task_id: 40, title: "Another Task", priority: "low", order: 3},
            {task_id: 41, title: "Another Another Task", priority: "low", order: 4},
        ]
}

// EDIT/REORDER TASKS

PUT /lists/13/tasks
<- { task_id: 41, priority: "high", title: "Still Another Another Task" }
-> {task_id: 41, title: "Still Another Another Task", priority: "high", order: 4}

PUT /lists/13/tasks
<- { task_id: 41, insert_after: 1}
-> {task_id: 41, title: "Still Another Another Task", priority: "high", order: 2}


GET /lists/13
-> {
         title: "Work", priority: "high", list_id: 13,
         tasks: [ 
            {task_id: 37, title: "Submit Systems Design Assignment", priority: "high", order: 1},
            {task_id: 41, title: "Still Another Another Task", priority: "high", order: 2},
            {task_id: 38, title: "Wake up", priority: "low", order: 3, sub_tasks: 
                [
                    {task_id: 42, title: "Set Alarm", priority: "low", order: 1},
                    {task_id: 43, title: "Clean Room", priority: "low", order: 2}
                ]
            },
            {task_id: 40, title: "Another Task", priority: "low", order: 4},
        ]
}

// MARK TASKS AS DONE

PUT /lists/13/tasks
<- { task_id: 41, done: true }
-> {}

GET /lists/13
-> {
         title: "Work", priority: "high", list_id: 13,
         tasks: [ 
            {task_id: 37, title: "Submit Systems Design Assignment", priority: "high", order: 1},
            {task_id: 41, title: "Still Another Another Task", priority: "high", order: 2, done: true},
            {task_id: 38, title: "Wake up", priority: "low", order: 3, sub_tasks: 
                [
                    {task_id: 42, title: "Set Alarm", priority: "low", order: 1},
                    {task_id: 43, title: "Clean Room", priority: "low", order: 2}
                ]
            },
            {task_id: 40, title: "Another Task", priority: "low", order: 4},
        ]
}


