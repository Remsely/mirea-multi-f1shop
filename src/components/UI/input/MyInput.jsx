import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({placeHolder, style}) => {
    return (
        <input style={style} type="text" className={classes.myInput} placeholder={placeHolder}/>
    );
};

export default MyInput;