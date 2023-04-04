import React from 'react';
import './InputField.scss';

const InputField = ({ label, type, id, name, value, placeholder, onChange }) => {
    return (
        <div className='input'>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
