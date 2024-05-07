import React from 'react';
import classes from "./MyButton.module.css";

const MyButton = ({...props}) => {
    return (
        <button className={classes.btn} {...props}></button>
    );
};

export default MyButton;