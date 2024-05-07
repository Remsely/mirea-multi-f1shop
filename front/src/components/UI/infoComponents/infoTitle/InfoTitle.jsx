import React from 'react';
import classes from "./InfoTitle.module.css";

const InfoTitle = ({children, ...props}) => {
    return (
        <h3 className={classes.h} {...props}>{children}</h3>
    );
};

export default InfoTitle;