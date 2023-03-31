import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addEmployee, getFromLocalStorage, saveToLocalStorage } from '../../data/Data';
import './AddEmployee.scss';

const AddEmployee = () => {
    const Employees = getFromLocalStorage()
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
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

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for mode
        const mode = queryParams.get("mode");

        if (mode === "edit") {
            const id = queryParams.get('id');

            const updatedEmployees = Employees.map((employee) =>
                employee.id === parseInt(id) ? newEmployee : employee
            );
            console.log(updatedEmployees)
            saveToLocalStorage(updatedEmployees);
        } else {
            const newId = Math.floor(Math.random() * 19986500);
            const newEmployeeWithId = { ...newEmployee, id: newId };
            addEmployee(newEmployeeWithId);
        }

        navigate("/employees");
    };


    useEffect(() => {
        const mode = queryParams.get('mode');
        console.log(mode)
        const id = queryParams.get('id');
        setMode(mode);
        setId(id);

        if (mode === 'edit') {
            // Find the employee with the matching id in the Employees array
            const employee = Employees.find(emp => emp.id === Number(id));
            console.log(employee)
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='employeeName'>Employee Name:</label>
                    <input
                        type='text'
                        id='employeeName'
                        name='EmployeeName'
                        value={newEmployee.EmployeeName}
                        placeholder={mode === 'edit' ? newEmployee.EmployeeName : ' '}
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
                        placeholder={mode === 'edit' ? newEmployee.Designation : ''}
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
                        placeholder={mode === 'edit' ? newEmployee.Email : ''}
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
                        placeholder={mode === 'edit' ? newEmployee.Address : ''}
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
                        placeholder={mode === 'edit' ? newEmployee.Phone : ''}
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