import React from 'react';
import classes from "./InfoImage.module.css";

const InfoImage = ({src, alt, ...props}) => {
    return (
        <img
            className={classes.logo}
            src={src}
            alt={alt}
            {...props}
        />
    );
};

export default InfoImage;