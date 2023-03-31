import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employees, Tasks } from '../../data/Data';
import './Employee.scss';

const Employee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [employeeTasks, setEmployeeTasks] = useState([]);

    useEffect(() => {
        const employeeData = Employees.find(employee => employee.id === parseInt(id));
        setEmployee(employeeData);
        console.log(employeeData.Tasks.length)
        // if (employeeData.Tasks.length > 0) {
        //     const tasks = employeeData.Tasks.map(task => Tasks.find(t => t.taskId === task.TaskId));
        //     setEmployeeTasks(tasks);
        // }
    }, [id]);

    return (
        <div className='container'>
            {employee ? (
                <div className='single_employee'>

                    <div className="top">
                        <h2>{employee.EmployeeName}</h2>
                        <button onClick={() => navigate(`/employee?mode=edit&id=${employee.id}`)} className='btn'>Edit</button>
                    </div>

                    <div className="employee_data">

                        <div className="employee_row">
                            <div className='employee_row_single'>
                                <span>Designation: </span>
                                {employee.Designation}
                            </div>

                            <div className='employee_row_single'>
                                <span>Email: </span>
                                {employee.Email}
                            </div>
                        </div>

                        <div className="employee_row">
                            <div className='employee_row_single'>
                                <span>Address: </span>
                                {employee.Address}
                            </div>

                            <div className='employee_row_single'>
                                <span>Phone: </span>
                                {employee.Phone}
                            </div>
                        </div>

                        <div className='employee_tasks'>
                            <span>Assigned Tasks: {employee?.Tasks?.length}</span>

                            <div className="employee_single_task">
                                {employeeTasks &&
                                    <ul>
                                        {employeeTasks.map(task => (
                                            <li key={task.taskId}>{task.taskName}</li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Employee not found</h2>
            )}
        </div>
    )
}

export default Employee;
