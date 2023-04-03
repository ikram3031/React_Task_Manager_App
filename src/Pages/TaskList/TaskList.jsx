import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFromLocalStorage, getTasksFromLocalStorage } from '../../data/Data';
import './TaskList.scss'

const TaskList = () => {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState([]);
    const tasks = getTasksFromLocalStorage();
    const employees = getFromLocalStorage();

    // function to find employee by id
    const findEmployeeById = (id) => {
        return employees.find((employee) => employee.id === id);
    };

    useEffect(() => {
        setTaskData(tasks);
        console.log(taskData)
    }, []);

    return (
        <div className='container'>
            <div className="top">
                <h2 className='title'>Task List</h2>
                <button onClick={() => navigate('/task?mode=add')} className='btn'>Add New</button>
            </div>
            <ul className='task_table'>
                <li className='task_table_row row_one'>
                    <div className='task_table-cell'>Task Id</div>
                    <div className='task_table-cell'>Task name</div>
                    <div className='task_table-cell'>Assigned Employee</div>
                    <div className='task_table-cell'>Active</div>
                    <div className='task_table-cell'>Edit</div>
                </li>
                {
                    taskData.map((task) => (

                        <li className='task_table_row' key={task.taskId}>
                            <div className='task_table-cell'>{task.taskId}</div>
                            <div className='task_table-cell'>{task.taskName}</div>
                            <div className='task_table-cell'> {findEmployeeById(parseInt(task.assigned))?.EmployeeName}</div>
                            <div className='task_table-cell'>{task.isActive.toUpperCase()}</div>
                            <Link to={`/task?mode=edit&taskId=${task.taskId}`} className='task_table-cell'>Edit</Link>
                        </li>

                    ))
                }
            </ul>
        </div>
    )
}

export default TaskList