import React from 'react';
import classes from "./CartButton.module.css";

const CartButton = ({icon, onClick}) => {
    return (
        <button
            className={classes.button}
            onClick={onClick}
        >
            <img
                className={classes.icon}
                src={icon}
                alt={"Кнопка"}
            />
        </button>
    );
};

export default CartButton;