import React, { useState, useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFromLocalStorage, saveToLocalStorage } from '../../data/Data';
import './CreateLeave.scss';
import InputField from '../../components/InputField/InputField';

const initialState = {
    error: '',
    message: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setError':
            return { ...state, error: action.payload };
        case 'setMessage':
            return { ...state, message: action.payload };
        case 'reset':
            return initialState;
        default:
            return state;
    }
};

const CreateLeave = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const Employees = getFromLocalStorage();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [mode, setMode] = useState(null);
    const [id, setId] = useState(null);

    const [newLeave, setNewLeave] = useState({
        LeaveId: '',
        LeaveReason: '',
        LeaveFrom: '',
        LeaveTo: '',
        LeaveDuration: 0,
        LeaveType: '',
    });

    const deleteLeave = () => {
        const leaveId = parseInt(queryParams.get('leaveId'));

        const updatedEmployees = Employees.map((employee) => {
            if (employee.id === id) {
                const updatedLeaves = employee.Leaves.filter((leave) => leave.LeaveId !== leaveId)
                const updatedEmployee = {
                    ...employee,
                    Leaves: updatedLeaves
                }
                return updatedEmployee;
            }
            return employee;
        })
        console.log(updatedEmployees)
        saveToLocalStorage(updatedEmployees);

        dispatch({ type: 'setError', payload: 'Successfully Deleted . Redirecting ....' });

        // add a 2-seconds delay before navigating to the tasks page
        setTimeout(() => {
            navigate(`/employees/${id}`);
        }, 2000);
    }

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setNewLeave((prevLeave) => ({ ...prevLeave, [id]: value }));
    };

    // SUbmit Function
    const handleSubmit = (event) => {
        event.preventDefault();

        // check for blank inputs
        if (newLeave.LeaveReason === '' || newLeave.LeaveFrom === '' || newLeave.LeaveTo === '' || newLeave.LeaveType === '') {

            dispatch({ type: 'setError', payload: 'Please fill out all input fields!!!' });

            setTimeout(() => {
                dispatch({ type: 'setError', payload: '' });
            }, 3000);

            return;
        }
        // check if leave from and leave to is same value
        else if (newLeave.LeaveFrom === newLeave.LeaveTo) {
            dispatch({ type: 'setError', payload: 'Leave From and Leave To Can not be same Date!!' });

            setTimeout(() => {
                dispatch({ type: 'setError', payload: '' });
            }, 3000);

            return;
        } else {
            // calculate the LeaveDuration
            const from = new Date(newLeave.LeaveFrom);
            const to = new Date(newLeave.LeaveTo);
            const diff = to.getTime() - from.getTime();
            const duration = Math.round(diff / (1000 * 60 * 60 * 24));

            // Check for mode
            const mode = queryParams.get("mode");

            // Edit Mode
            if (mode === "edit") {
                const leaveId = parseInt(queryParams.get('leaveId'));

                // / find the Employee object with the given id
                const employeeIndex = Employees.findIndex((employee) => employee.id === parseInt(id));

                const updatedLeaves = Employees[employeeIndex].Leaves.map((leave) => {
                    if (leave.LeaveId === leaveId) {
                        return { ...newLeave, LeaveDuration: duration };
                    }
                    else {
                        return leave
                    }
                })

                const updatedEmployee = {
                    ...Employees[employeeIndex],
                    Leaves: updatedLeaves
                };

                console.log(updatedEmployee.Leaves)

                // update the Employees array with the updated Employee object
                const updatedEmployees = [
                    ...Employees.slice(0, employeeIndex),
                    updatedEmployee,
                    ...Employees.slice(employeeIndex + 1)
                ];

                // save the updated Employees array to local storage
                saveToLocalStorage(updatedEmployees);

                dispatch({ type: 'setMessage', payload: 'Updated Successfully. Redirecting...' });
            } else {
                // / find the Employee object with the given id
                const employeeIndex = Employees.findIndex((employee) => employee.id === parseInt(id));

                const newId = Math.floor(Math.random() * 19986500);
                const newLeaveWithId = { ...newLeave, LeaveId: newId, LeaveDuration: duration };

                const updatedEmployee = {
                    ...Employees[employeeIndex],
                    Leaves: [...Employees[employeeIndex].Leaves, newLeaveWithId]
                };

                console.log(updatedEmployee.Leaves)

                // update the Employees array with the updated Employee object
                const updatedEmployees = [
                    ...Employees.slice(0, employeeIndex),
                    updatedEmployee,
                    ...Employees.slice(employeeIndex + 1)
                ];

                // save the updated Employees array to local storage
                saveToLocalStorage(updatedEmployees);

                dispatch({ type: 'setMessage', payload: 'Created Successfully. Redirecting...' });
            }

            // add a 2-seconds delay before navigating to the tasks page
            setTimeout(() => {
                navigate(`/employees/${id}`);
            }, 2000);

        }
    }

    useEffect(() => {
        const mode = queryParams.get('mode');

        const id = parseInt(queryParams.get('id'));
        const leaveId = parseInt(queryParams.get('leaveId'));

        console.log(`Mode: ${mode} && ID: ${id}`);
        setMode(mode);
        setId(id);

        console.log(`Mode: ${mode} & ID: ${id} & leaveId=${leaveId}`)

        if (mode === 'edit') {
            // Find the employee with the matching id in the Employees array
            const employee = Employees.find(emp => emp.id === id);

            if (employee) {
                const employeeLeave = employee.Leaves.find(leave => leave.LeaveId === leaveId)

                if (employeeLeave) {

                    // set previous values as initial value 
                    setNewLeave({
                        LeaveId: leaveId,
                        LeaveReason: employeeLeave.LeaveReason,
                        LeaveFrom: employeeLeave.LeaveFrom,
                        LeaveTo: employeeLeave.LeaveTo,
                        LeaveDuration: employeeLeave.LeaveDuration,
                        LeaveType: employeeLeave.LeaveType,
                    })
                }
            }

        }
    }, [location]);

    return (
        <div className='Leave'>
            <div className="top">
                <h2 className='title'>
                    {mode === 'add' ? 'Request a Leave' : 'Edit Leave'}
                </h2>
                {
                    mode === 'add' ? ' ' : (
                        <button onClick={deleteLeave} className='btn_red'>Delete</button>
                    )
                }
            </div>

            {/* Show Error */}
            {state.error && (
                <div className="error">
                    <h3>{state.error}</h3>
                </div>
            )}

            {/* Show message */}
            {state.success && (
                <div className="message">
                    <h3>{state.success}</h3>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <InputField
                    label='Leave Reason:'
                    type='text'
                    id='LeaveReason'
                    name='LeaveReason'
                    value={newLeave.LeaveReason}
                    onChange={handleInputChange}
                    placeholder={mode === 'edit' ? newLeave.LeaveReason : 'Enter the Reason of your leave'}
                />

                <InputField
                    label='Leave From:'
                    type='date'
                    id='LeaveFrom'
                    name='LeaveFrom'
                    value={newLeave.LeaveFrom}
                    onChange={handleInputChange}
                />

                <InputField
                    label='Leave To:'
                    type='date'
                    id='LeaveTo'
                    name='LeaveTo'
                    value={newLeave.LeaveTo}
                    onChange={handleInputChange}
                />


                <div className='form_row'>
                    <label htmlFor='LeaveType'>Leave Type:</label>
                    <select
                        id='LeaveType'
                        name='LeaveType'
                        value={newLeave.LeaveType}
                        onChange={handleInputChange}
                    >
                        <option value=''>Select a Type</option>

                        <option value='Sick Leave'>
                            Sick Leave
                        </option>
                        <option value='Paid Leave'>
                            Paid Leave
                        </option>

                    </select>
                </div>

                <button className='btn m1' type='submit'>
                    {mode === 'add' ? 'Create Leave' : 'Update Leave'}
                </button>

            </form>
        </div>
    )
}

export default CreateLeave