import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import classes from "./Catalog.module.css";

const Catalog = () => {
    return (
        <div className={classes.bodyDiv}>
            <MyInput placeHolder="Поиск..." style={{display: "block", width: "100%", maxWidth: "1000px"}}/>
        </div>
    );
};

export default Catalog;