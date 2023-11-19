import React from 'react';
import classes from "./ProductCard.module.css";

const ProductCard = ({imgURL, name, price}) => {
    return (
        <div className={classes.card}>
            <img className={classes.image} src={imgURL} alt={name}/>
            <div className={classes.name}>{name}</div>
            <div className={classes.price}> {price}</div>
        </div>
    );
};

export default ProductCard;