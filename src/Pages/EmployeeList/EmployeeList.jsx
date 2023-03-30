import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Employees } from '../../data/Data';
import './EmployeeList.scss'

const EmployeeList = () => {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        setEmployeeData(Employees);
    }, []);

    return (
        <div className='container'>
            <h2 className='title'>Employee List</h2>
            <ul className='table'>
                <li className='table_row row_one'>
                    <div className='table-cell'>Name</div>
                    <div className='table-cell'>Designation</div>
                    <div className='table-cell'>Email</div>
                    <div className='table-cell'>Tasks Number</div>
                </li>
                {employeeData.map((employee) => (
                    <Link to={`/employees/${employee.id}`}>
                        <li className='table_row' key={employee.id}>
                            <div className='table-cell'>{employee.EmployeeName}</div>
                            <div className='table-cell'>{employee.Designation}</div>
                            <div className='table-cell'>{employee.Email}</div>
                            <div className='table-cell'>{employee.Tasks.length}</div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default EmployeeList