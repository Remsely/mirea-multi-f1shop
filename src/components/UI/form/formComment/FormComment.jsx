import React from 'react';
import classes from "./FormComment.module.css";

const FormComment = ({id, text, value, onChange}) => {
    return (
        <div className={classes.container}>
            <label htmlFor={id}>{text}:</label>
            <textarea
                value={value}
                onChange={onChange}
                className={classes.textArea}
                id={id}
                name={id}></textarea>
        </div>
    );
};

export default FormComment;