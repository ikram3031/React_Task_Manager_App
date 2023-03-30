import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='home'>
            <h2>Welcome to Task Manager App</h2>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Fugit et reprehenderit!
            </p>

            <div className="buttons">
                <button onClick={() => navigate('/addtask')} className='btn'>Add Task</button>
                <button onClick={() => navigate('/addemployee')} className='btn'>Add Employee</button>
            </div>
        </div>
    )
}

export default Home