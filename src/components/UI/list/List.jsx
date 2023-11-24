import React from 'react';
import classes from "./List.module.css";

const List = ({heading, content}) => {
    return (
        <div>
            <h3 className={classes.h}>{heading}:</h3>
            <ul className={classes.ul}>
                {content.map(item =>
                    <li className={classes.li}><b>{item.heading}:</b> {item.body}</li>
                )}
            </ul>
        </div>
    );
};

export default List;