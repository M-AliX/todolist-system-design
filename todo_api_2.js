// ASSUMMPTIONS
// 1. Subtasks can be assigned priorities as well
// 2. Authentication is implicit (in the cookies/tokens)
// 3. The order of a task is changed by re-inserting it after another task (or at the beginning of the list)
// 4. When performing operations on lists/tasks, the consistency of their order is managed by the server
// 5. A task can be marked as done, even if the subtasks are not marked as done

// SHOW LISTS
GET /lists
-> {
        [ 
            {code: "L0013", title: "Work", priority: "high", order: 1},
            {code: "L0014", title: "Home", priority: "low", order: 2},
            {code: "L0015", title: "List1", priority: "low", order: 3},
    ]
}

// CREATE LIST
POST /lists
<- { title: "List2" }
-> // similar to GET /lists response

// DELETE LIST
DELETE /lists
<- {code: "L0015"}
-> // similar to GET /lists response

// EDIT LIST
PUT /lists
<- { code: "L0013", priority: "medium", title: "Non-Urgent Work" }
-> // similar to GET /lists response

// REORDER LIST
// `insert_after` tells after which order to re-insert the task
// new order becomes `insert_after`+1
PUT /lists
<- { code: "L0013", insert_after: 2}
-> {
        [ 
            {code: "L0014", title: "Home", priority: "low", order: 1},
            {code: "L0016", title: "List2", priority: "low", order: 2},
            {code: "L0013", title: "Non-Urgent Work", priority: "medium", order: 3}
    ]
}

// SHOW LIST DETAILS
GET /lists/L0013
-> {
         title: "Work", priority: "high", list_id: "L0013",
         tasks: [ 
            {code: "T0037", title: "Submit Systems Design Assignment", priority: "high", order: 1, done: false},
            {code: "T0038", title: "Wake up", priority: "low", order: 2, done: false
                subtasks:[
                    {code: "T0042", title: "Set Alarm", priority: "low", order: 1, done: false},
                ]
            },
            {code: "T0039", title: "Some Task", priority: "low", order: 3, done: true},
            {code: "T0040", title: "Another Task", priority: "low", order: 4, done: false},
        ]
}


// CREATE TASKS
POST /lists/L0013/tasks
<- {title: "Another Another Task"}
-> // similar to GET /lists/13 response

// SHOW A SINGLE TASK DETAILS
GET /lists/L0013/tasks/T0038
-> {
    code: "T0038", title: "Wake up", priority: "low", order: 2, done: false,
    subtasks: [
        {code: "T0042", title: "Set Alarm", priority: "low", order: 1, done: false},
    ]
}

// SHOW SUBTASKS
GET /lists/L0013/tasks/T0038/subtasks
-> {
    [
        {code: "T0042", title: "Set Alarm", priority: "low", order: 1, done: false},
    ]
}

// CREATE SUBTASKS (same as creating a task, but supply a `parent_task_code` parameter)
POST /lists/L0013/tasks
<- { title: "Clean Room", parent_task_code: "T0038" }
-> // similar to GET /lists/13 response

// DELETE TASKS
DELETE /lists/L0013/tasks
<- {code: "T0039"}
-> // similar to GET /lists/13 response

// EDIT TASKS
PUT /lists/L0013/tasks
<- { code: "T0041", priority: "high", title: "Still Another Another Task" }
-> // similar to GET /lists/13 response

// REORDER TASKS
PUT /lists/L0013/tasks
<- { code: "T0041", insert_after: 1}
-> // similar to GET /lists/13 response