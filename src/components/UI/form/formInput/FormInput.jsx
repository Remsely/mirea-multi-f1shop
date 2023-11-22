import React from 'react';
import classes from "./FormInput.module.css";

const FormInput = ({id, type, title, placeHolder, value, onChange}) => {
    return (
        <div className={classes.container}>
            <label htmlFor={id}>{title}:</label>
            <input
                value={value}
                onChange={onChange}
                className={classes.input}
                type={type}
                id={id}
                name={id}
                placeholder={placeHolder}
                required
            />
        </div>
    );
};

export default FormInput;