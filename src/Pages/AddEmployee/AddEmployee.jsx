import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addEmployee, getFromLocalStorage, saveToLocalStorage } from '../../data/Data';
import './AddEmployee.scss';
import InputField from '../../components/InputField/InputField';

const AddEmployee = () => {
    const Employees = getFromLocalStorage();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [mode, setMode] = useState(null);
    const [id, setId] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [newEmployee, setNewEmployee] = useState({
        EmployeeName: '',
        id: '',
        Designation: '',
        Email: '',
        Address: '',
        Phone: '',
        Tasks: [],
        Leaves: [],
    });

    // id
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setNewEmployee((prevEmployee) => ({ ...prevEmployee, [id]: value }));
    };

    // Submit Function
    const handleSubmit = (event) => {
        event.preventDefault();

        // check for blank inputs
        if (newEmployee.EmployeeName === '' || newEmployee.Designation === '' || newEmployee.Email === '' || newEmployee.Address === '' || newEmployee.Phone === '') {
            setError('Please fill out all input fields!!!');

            setTimeout(() => {
                setError('');
            }, 3000);

            return;
        } else {
            // Check for mode
            const mode = queryParams.get("mode");

            if (mode === "edit") {
                const id = queryParams.get('id');

                const updatedEmployees = Employees.map((employee) =>
                    employee.id === parseInt(id) ? newEmployee : employee
                );

                saveToLocalStorage(updatedEmployees);

                setMessage('Employee Updated Successfully...')
            } else {
                const newId = Math.floor(Math.random() * 19986500);
                const newEmployeeWithId = { ...newEmployee, id: newId };


                addEmployee(newEmployeeWithId);

                setMessage('Employee Created Successfully ...')
            }

            // add a 1-second delay before navigating to the Employees page
            setTimeout(() => {
                navigate('/employees');
            }, 2000);
        }
    };


    useEffect(() => {
        const mode = queryParams.get('mode');

        const id = queryParams.get('id');

        console.log(`Mode: ${mode} && ID: ${id}`);
        setMode(mode);
        setId(id);

        if (mode === 'edit') {
            // Find the employee with the matching id in the Employees array
            const employee = Employees.find(emp => emp.id === Number(id));
            if (employee) {
                // Set the initial values of the form to the employee's data
                setNewEmployee({
                    EmployeeName: employee.EmployeeName,
                    id: employee.id,
                    Designation: employee.Designation,
                    Email: employee.Email,
                    Address: employee.Address,
                    Phone: employee.Phone,
                    Tasks: employee.Tasks
                });
            }
        }
    }, [location]);

    return (
        <div className="employee">
            <h2 className='title'>
                {mode === 'add' ? 'Add Employee' : 'Edit Employee'}
            </h2>

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
                    label='Employee Name:'
                    type='text'
                    id='EmployeeName'
                    name='EmployeeName'
                    value={newEmployee.EmployeeName}
                    onChange={handleInputChange}
                    placeholder={mode === 'edit' ? newEmployee.EmployeeName : ' '}
                />
                <InputField
                    label='Designation:'
                    type='text'
                    id='Designation'
                    name='Designation'
                    value={newEmployee.Designation}
                    onChange={handleInputChange}
                    placeholder={mode === 'edit' ? newEmployee.Designation : ' '}
                />
                <InputField
                    label='Email:'
                    type='email'
                    id='Email'
                    name='Email'
                    value={newEmployee.Email}
                    onChange={handleInputChange}
                    placeholder={mode === 'edit' ? newEmployee.Email : ' '}
                />
                <InputField
                    label='Address:'
                    type='text'
                    id='Address'
                    name='Address'
                    value={newEmployee.Address}
                    onChange={handleInputChange}
                    placeholder={mode === 'edit' ? newEmployee.Address : ' '}
                />
                <InputField
                    label='Phone:'
                    type='tel'
                    id='Phone'
                    name='Phone'
                    value={newEmployee.Phone}
                    onChange={handleInputChange}
                    placeholder={mode === 'edit' ? newEmployee.Phone : ' '}
                />

                <button className='btn m1' type='submit'>
                    {mode === 'add' ? 'Create Employee' : 'Update Employee'}
                </button>
            </form>
        </div>
    );
}

export default AddEmployee