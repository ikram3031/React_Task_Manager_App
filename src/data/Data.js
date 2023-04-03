export let Employees = JSON.parse(localStorage.getItem("employees")) || [
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

    // Save updated employees array to localStorage
    localStorage.setItem("employees", JSON.stringify(Employees));
}

// Get Employee From Local Storage
export const getFromLocalStorage = () => {
    const employees = localStorage.getItem("employees");
    if (employees) {
        return JSON.parse(employees);
    } else {
        return [];
    }
};

// Employeess data Update
export const saveToLocalStorage = (employees) => {
    localStorage.setItem('employees', JSON.stringify(employees));
};



export let Tasks = JSON.parse(localStorage.getItem("tasks")) || [
    // {
    //     "taskName": "Fix bugs in UI",
    //     "taskId": 1,
    //     "assigned": 1234
    // },
    // {
    //     "taskName": "Refactor code",
    //     "taskId": 2,
    //     "assigned": 1234
    // },
];

// Add Tasks
export const addTask = (newTask) => {
    Tasks.push(newTask);

    // Save updated Tasks array to localStorage
    localStorage.setItem("tasks", JSON.stringify(Tasks));
}

// Get task From Local Storage
export const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        return [];
    }
};


// Tasks data Update
export const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
