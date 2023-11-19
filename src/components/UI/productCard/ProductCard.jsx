import React from 'react';
import classes from "./ProductCard.module.css";
import {useNavigate} from "react-router-dom";

const ProductCard = ({imgURL, name, price, id}) => {
    const router = useNavigate()

    return (
        <div className={classes.card} onClick={() => router(`/catalog/${id}`)}>
            <img className={classes.image} src={imgURL} alt={name}/>
            <div className={classes.name}>{name}</div>
            <div className={classes.price}> {price}</div>
        </div>
    );
};

export default ProductCard;