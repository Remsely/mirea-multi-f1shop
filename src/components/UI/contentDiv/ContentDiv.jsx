import React from 'react';
import classes from "./ContentDix.module.css";

const ContentDiv = ({children}) => {
    return (
        <div className={classes.div}>
            {children}
        </div>
    );
};

export default ContentDiv;