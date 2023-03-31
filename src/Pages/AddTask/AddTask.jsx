import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTask, getFromLocalStorage } from '../../data/Data';
import './AddTask.scss';

const AddTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState(null);
    const [id, setId] = useState(null);

    const [newTask, setNewTask] = useState({
        taskName: '',
        taskId: '',
        assigned: '',
    });

    const Employees = getFromLocalStorage();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newId = Math.floor(Math.random() * 19986500);
        const newTaskWithId = { ...newTask, taskId: newId };
        addTask(newTaskWithId);
        console.log(newTaskWithId)
        navigate('/tasks')
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const mode = searchParams.get('mode');
        console.log(mode)
        const id = searchParams.get('id');
        setMode(mode);
        setId(id);
    }, [location]);

    return (
        <div className="task">

            <h2 className='title'>
                {mode === 'add' ? 'Add Task' : 'Edit Task'}
            </h2>

            <form onSubmit={handleSubmit}>

                <div >
                    <label htmlFor='taskName'>Task Name:</label>
                    <input
                        type='text'
                        id='taskName'
                        name='taskName'
                        value={newTask.taskName}
                        onChange={handleInputChange}
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