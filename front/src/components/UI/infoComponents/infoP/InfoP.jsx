import React from 'react';
import classes from "./InfoP.module.css";

const InfoP = ({children}) => {
    return (
        <p className={classes.p}>{children}</p>
    );
};

export default InfoP;