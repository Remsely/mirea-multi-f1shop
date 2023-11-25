import React from 'react';
import classes from "./InfoImage.module.css";

const InfoImage = ({src, alt, link, ...props}) => {
    return (
        <a href={link} target={"_blank"} rel="noopener noreferrer">
            <img
                className={classes.logo}
                src={src}
                alt={alt}
                {...props}
            />
        </a>
    );
};

export default InfoImage;