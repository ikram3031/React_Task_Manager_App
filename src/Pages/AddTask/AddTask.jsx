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
import InputField from '../../components/InputField/InputField';

const AddTask = () => {
    const Employees = getFromLocalStorage();
    const Tasks = getTasksFromLocalStorage();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [mode, setMode] = useState(null);
    const [id, setId] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [newTask, setNewTask] = useState({
        taskName: '',
        taskId: '',
        assigned: '',
        isActive: 'true',
    });

    // Task Adding to Employee
    const updateEmployeeData = (previousEmployeeId, newEmployeeId, taskId) => {
        const employees = getFromLocalStorage();
        const updatedEmployees = employees.map((employee) => {

            // if Assigned employee is not changed
            if (employee.id === parseInt(previousEmployeeId)) {
                const taskIndex = employee.Tasks.indexOf(parseInt(taskId));
                if (taskIndex !== -1) {
                    const updatedTasks = [...employee.Tasks];
                    updatedTasks.splice(taskIndex, 1);
                    return {
                        ...employee,
                        Tasks: updatedTasks,
                    };
                }
            }

            // if Assigned employee is changed
            if (employee.id === parseInt(newEmployeeId)) {
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
        const { id, value } = event.target;
        setNewTask((prevTask) => ({ ...prevTask, [id]: value }));
    };

    // Submit Function
    const handleSubmit = (event) => {
        event.preventDefault();

        // check for empty form inputs
        if (newTask.taskName === '' || newTask.assigned === '') {
            setError('Please Provide Task Name && Assigned Employee')

            console.log(error)

            setTimeout(() => {
                setError('')
            }, 3000);

            return
        }
        else {
            // check for mode
            const mode = queryParams.get("mode");

            if (mode === 'edit') {
                const id = queryParams.get('taskId');

                const updatedTask = { ...newTask, taskId: parseInt(id) };

                // check if the task already exists
                const updatedTasks = Tasks.map((task) =>
                    task.taskId === parseInt(id) ? updatedTask : task
                );

                const previousEmployeeId = parseInt(Tasks.find((task) => task.taskId === parseInt(id)).assigned);

                const newEmployeeId = parseInt(newTask.assigned);

                saveTasksToLocalStorage(updatedTasks);

                updateEmployeeData(previousEmployeeId, newEmployeeId, parseInt(id));

                setMessage('Task Updated Successfully...')
            } else {
                const newId = Math.floor(Math.random() * 19986500);
                const newTaskWithId = { ...newTask, taskId: newId };

                addTask(newTaskWithId);
                updateEmployeeData(null, parseInt(newTask.assigned), newId);

                setMessage('Task Created Successfully...')

            }

            // add a 2-seconds delay before navigating to the tasks page
            setTimeout(() => {
                navigate('/tasks');
            }, 2000);
        }

    };

    // Delete
    const deleteTask = () => {
        const taskId = queryParams.get('taskId');
        const updatedTasks = Tasks.filter((task) => task.taskId !== parseInt(taskId));
        saveTasksToLocalStorage(updatedTasks);

        const employeeId = parseInt(newTask.assigned);

        // Remove the Task from Employee Tasks
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

        // add a 2-second delay before navigating to the tasks page
        setTimeout(() => {
            navigate('/tasks');
        }, 2000);
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

            {/* Show Error */}
            {error && (
                <div className="error">
                    <h3>{error}</h3>
                </div>
            )}

            {/* Show message */}
            {message && (
                <div className="message">
                    <h3>{message}</h3>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <InputField
                    label='Task Name:'
                    type='text'
                    id='taskName'
                    name='taskName'
                    value={newTask.taskName}
                    onChange={handleInputChange}
                    placeholder={mode === 'edit' ? newTask.taskName : ' '}
                />

                <div className='form_row'>
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

                {mode === 'add' ? ' ' : (
                    <div className='form_row'>
                        <label htmlFor="taskName">Is Active:</label>
                        <div className='checkboxes'>
                            <div className='checkbox'>
                                <input
                                    id="isActive"
                                    type="radio"
                                    name="isActive"
                                    value="true"
                                    checked={newTask.isActive === 'true'}
                                    onChange={handleInputChange}
                                />
                                True
                            </div>
                            <div className='checkbox'>
                                <input
                                    id="isActive"
                                    type="radio"
                                    name="isActive"
                                    value="false"
                                    checked={newTask.isActive === 'false'}
                                    onChange={handleInputChange}
                                />
                                False
                            </div>
                        </div>
                    </div>

                )}

                <button className='btn m1' type='submit'>
                    {mode === 'add' ? 'Create Task' : 'Update Task'}
                </button>

            </form>
        </div>
    )
}

export default AddTask