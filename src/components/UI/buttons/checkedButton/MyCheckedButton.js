import React from 'react';
import classes from "./MyCheckedButton.module.css";

const MyCheckedButton = ({...props}) => {
    return (
        <button className={classes.btn} {...props}></button>
    );
};

export default MyCheckedButton;