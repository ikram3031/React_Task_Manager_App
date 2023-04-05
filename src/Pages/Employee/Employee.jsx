import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFromLocalStorage, getTasksFromLocalStorage, saveToLocalStorage } from '../../data/Data';
import './Employee.scss';

const Employee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const ID = Number(id)
    const [employee, setEmployee] = useState(null);
    const [employeeTasks, setEmployeeTasks] = useState([]);
    const [employeeLeaves, setEmployeeLeaves] = useState([]);
    const employees = getFromLocalStorage();
    const tasks = getTasksFromLocalStorage();

    // function to find Task by id
    const findTaskById = (id) => {
        const task = tasks.find((Task) => Task.taskId === id);
        return task
    };

    // Delete
    const handleDelete = () => {
        const filteredEmployees = employees.filter((emp) => emp.id !== ID);
        saveToLocalStorage(filteredEmployees);
        navigate('/employees');
    }

    useEffect(() => {

        // find Employee By ID
        const getEmployeeById = (id) => {
            return employees.find((employee) => employee.id === id)
        }

        const result = getEmployeeById(ID);

        if (result) {
            setEmployee(result)
            setEmployeeTasks(result.Tasks);
            setEmployeeLeaves(result.Leaves)
        }

    }, [ID]);

    return (
        <div className='container'>
            {employee ? (
                <div className='single_employee'>

                    <div className="top">
                        <h2>{employee.EmployeeName}</h2>
                        <div className="buttons">
                            <button onClick={() => navigate(`/employee?mode=edit&id=${employee.id}`)} className='btn'>Edit</button>
                            <button onClick={handleDelete} className='btn_red'>Delete</button>
                        </div>
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

                        {employeeTasks.length > 0 && (
                            <div key={employee.id} className='employee_tasks'>
                                <div className='task_header'>Assigned Tasks: {employeeTasks.length}</div>

                                <div className="employee_single_task">
                                    <ul>
                                        {employeeTasks.map((task) => {

                                            return (
                                                <li key={task}>
                                                    {findTaskById(task)?.taskName}
                                                </li>
                                            )

                                        })}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className="employee_leaves">
                            <div className='leave_header'>
                                <span>Taken Leaves:</span>
                                <button
                                    onClick={() => navigate(`/employees/leave?mode=add&id=${id}`)}
                                    className='btn_leave'>Request a Leave</button>
                            </div>

                            <div className="employee_leave_list">
                                <ul>
                                    <li className='list_one'>
                                        <div className='leave_cell'>Leave Type</div>
                                        <div className='leave_cell'>Reason</div>
                                        <div className='leave_cell'>Duration</div>
                                        <div className='leave_small'>Edit</div>
                                    </li>
                                    {
                                        employeeLeaves.length > 0 && employeeLeaves.map((leave) => {
                                            return (
                                                <li key={leave.LeaveId} className='list_other'>
                                                    <div className='leave_cell'>{leave.LeaveType}</div>
                                                    <div className='leave_cell'>{leave.LeaveReason}</div>
                                                    <div className='leave_cell'>{leave.LeaveDuration} Day/s</div>
                                                    <Link to={`/employees/leave?mode=edit&id=${id}&leaveId=${leave.LeaveId}`} className='leave_small'>Edit</Link>
                                                </li>
                                            )
                                        })}
                                </ul>
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
