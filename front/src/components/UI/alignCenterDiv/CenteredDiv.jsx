import React from 'react';
import styles from './CenteredDiv.module.css'

const CenteredDiv = ({children}) => {
    return (
        <div className={styles.centeredDiv}>
            {children}
        </div>
    );
};

export default CenteredDiv;