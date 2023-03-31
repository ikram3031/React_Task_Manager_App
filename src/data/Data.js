export let Employees = [
    // {
    //     "EmployeeName": "John Doe",
    //     "id": 1234,
    //     "Designation": "Software Engineer",
    //     "Email": "johndoe@example.com",
    //     "Address": "123 Main St, Anytown USA",
    //     "Phone": "555-1234",
    //     "Tasks": [
    //         {
    //             "TaskId": 1
    //         },
    //         {
    //             "TaskId": 2
    //         }
    //     ]
    // },
    // {
    //     "EmployeeName": "Jane Smith",
    //     "id": 5678,
    //     "Designation": "Project Manager",
    //     "Email": "janesmith@example.com",
    //     "Address": "456 Oak Ave, Anytown USA",
    //     "Phone": "555-5678",
    //     "Tasks": [
    //         {
    //             "TaskId": 3
    //         },
    //         {
    //             "TaskId": 4
    //         }
    //     ]
    // },
    // {
    //     "EmployeeName": "Bob Johnson",
    //     "id": 9012,
    //     "Designation": "UI Designer",
    //     "Email": "bobjohnson@example.com",
    //     "Address": "789 Elm St, Anytown USA",
    //     "Phone": "555-9012",
    //     "Tasks": [
    //         {
    //             "TaskId": 5
    //         },
    //         {
    //             "TaskId": 6
    //         }
    //     ]
    // }
];

// Add Employee
export const addEmployee = (newEmployee) => {
    Employees.push(newEmployee);
}

export const Tasks = [
    {
        "taskName": "Fix bugs in UI",
        "taskId": 1,
        "assigned": 1234
    },
    {
        "taskName": "Refactor code",
        "taskId": 2,
        "assigned": 1234
    },
    {
        "taskName": "Create project timeline",
        "taskId": 3,
        "assigned": 5678
    },
    {
        "taskName": "Lead team meeting",
        "taskId": 4,
        "assigned": 5678
    },
    {
        "taskName": "Design new website layout",
        "taskId": 5,
        "assigned": 9012
    },
    {
        "taskName": "Implement responsive design",
        "taskId": 6,
        "assigned": 9012
    }
];
