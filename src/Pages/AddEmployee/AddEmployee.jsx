import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Employees, addEmployee } from '../../data/Data';
import './AddEmployee.scss';

const AddEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState(null);
    const [id, setId] = useState(null);

    const [newEmployee, setNewEmployee] = useState({
        EmployeeName: '',
        id: '',
        Designation: '',
        Email: '',
        Address: '',
        Phone: '',
        Tasks: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    };

    const generateId = () => {
        const id = Math.random().toString(36).substr(2, 9);
        return id;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newId = generateId();
        const newEmployeeWithId = { ...newEmployee, id: newId };
        addEmployee(newEmployeeWithId);
        console.log(newEmployeeWithId)
        // navigate('/employees')
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
        <div className="employee">

            <h2 className='title'>
                {mode === 'add' ? 'Add Employee' : 'Edit Employee'}
            </h2>

            <form onSubmit={handleSubmit}>

                <div >
                    <label htmlFor='employeeName'>Employee Name:</label>
                    <input
                        type='text'
                        id='employeeName'
                        name='EmployeeName'
                        value={newEmployee.EmployeeName}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor='designation'>Designation:</label>
                    <input
                        type='text'
                        id='designation'
                        name='Designation'
                        value={newEmployee.Designation}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='Email'
                        value={newEmployee.Email}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor='address'>Address:</label>
                    <input
                        type='text'
                        id='address'
                        name='Address'
                        value={newEmployee.Address}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor='phone'>Phone:</label>
                    <input
                        type='text'
                        id='phone'
                        name='Phone'
                        value={newEmployee.Phone}
                        onChange={handleInputChange}
                    />
                </div>

                <button className='btn m1' type='submit'>
                    {mode === 'add' ? 'Create Employee' : 'Update Employee'}
                </button>

            </form>
        </div>
    );
}

export default AddEmployee