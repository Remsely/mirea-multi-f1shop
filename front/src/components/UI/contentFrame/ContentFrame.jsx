import React from 'react';
import classes from "./ContentFrame.module.css";

const ContentFrame = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default ContentFrame;