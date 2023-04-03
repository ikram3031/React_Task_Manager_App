import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    addTask,
    getFromLocalStorage,
    getTasksFromLocalStorage,
    saveToLocalStorage,
    saveTasksToLocalStorage
} from '../../data/Data';
import './AddTask.scss';

const AddTask = () => {
    const Employees = getFromLocalStorage();
    const Tasks = getTasksFromLocalStorage();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [mode, setMode] = useState(null);
    const [id, setId] = useState(null);

    const [newTask, setNewTask] = useState({
        taskName: '',
        taskId: '',
        assigned: '',
    });

    // Task Adding to Employee
    const updateEmployeeData = (employeeId, taskId) => {
        const employees = getFromLocalStorage();
        const updatedEmployees = employees.map((employee) => {
            if (employee.id === parseInt(employeeId)) {
                const taskExists = employee.Tasks.some((task) => task === parseInt(taskId));
                if (!taskExists) {
                    const updatedTasks = [...employee.Tasks, parseInt(taskId)];
                    return {
                        ...employee,
                        Tasks: updatedTasks,
                    };
                }
            }
            return employee;
        });
        saveToLocalStorage(updatedEmployees);
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // check for mode
        const mode = queryParams.get("mode");
        if (mode === 'edit') {
            const id = queryParams.get('taskId');
            const updatedTask = { ...newTask, taskId: parseInt(id) };
            const updatedTasks = Tasks.map((task) =>
                task.taskId === parseInt(id) ? updatedTask : task
            );

            console.log(`Task After Update: ${updatedTask}`)

            const employeeId = parseInt(newTask.assigned)

            saveTasksToLocalStorage(updatedTasks);
            console.log(updatedTasks)

            updateEmployeeData(updatedTask.assigned, id);

        } else {
            const newId = Math.floor(Math.random() * 19986500);
            const newTaskWithId = { ...newTask, taskId: newId };
            addTask(newTaskWithId);
            updateEmployeeData(newTask.assigned, newId);
        }
        navigate('/tasks');
    };

    // Delete
    const deleteTask = () => {
        const taskId = queryParams.get('taskId');
        const updatedTasks = Tasks.filter((task) => task.taskId !== parseInt(taskId));
        saveTasksToLocalStorage(updatedTasks);

        const employeeId = parseInt(newTask.assigned);
        const updatedEmployees = Employees.map((employee) => {
            if (employee.id === employeeId) {
                const updatedTasks = employee.Tasks.filter((taskIdFromEmployee) => taskIdFromEmployee !== parseInt(taskId));
                return {
                    ...employee,
                    Tasks: updatedTasks,
                };
            }
            return employee;
        });
        saveToLocalStorage(updatedEmployees);

        navigate('/tasks');
    };



    useEffect(() => {
        const mode = queryParams.get('mode');

        const id = queryParams.get('taskId');

        console.log(`Mode: ${mode} && ID: ${id}`);

        setMode(mode);
        setId(id);

        if (mode === 'edit') {
            // Find the Task with the matching id in the Tasks array
            const task = Tasks.find(task => task.taskId === parseInt(id));
            console.log(task)
            if (task) {
                // Set the initial values of the form to the task's data
                setNewTask({
                    taskName: task.taskName,
                    taskId: task.taskId,
                    assigned: task.assigned,
                });
            }
        }
    }, [location]);

    return (
        <div className="task">

            <div className="top">
                <h2 className='title'>
                    {mode === 'add' ? 'Add Task' : 'Edit Task'}
                </h2>
                {
                    mode === 'add' ? ' ' : (
                        <button onClick={deleteTask} className='btn_red'>Delete</button>
                    )
                }
            </div>

            <form onSubmit={handleSubmit}>

                <div >
                    <label htmlFor='taskName'>Task Name:</label>
                    <input
                        type='text'
                        id='taskName'
                        name='taskName'
                        value={newTask.taskName || ""}
                        onChange={handleInputChange}
                        placeholder={mode === 'edit' ? newTask.taskName : ''}
                    />
                </div>

                <div >
                    <label htmlFor='taskName'>Assign to:</label>
                    <select
                        id='assigned'
                        name='assigned'
                        value={newTask.assigned}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select an employee</option>
                        {Employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.EmployeeName}
                            </option>
                        ))}
                    </select>
                </div>

                <button className='btn m1' type='submit'>
                    {mode === 'add' ? 'Create Task' : 'Update Task'}
                </button>

            </form>
        </div>
    )
}

export default AddTask