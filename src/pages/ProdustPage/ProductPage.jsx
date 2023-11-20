import React from 'react';
import {useParams} from "react-router-dom";
import ProductService from "../../API/ProductService";
import MyButton from "../../components/UI/button/MyButton";
import ContentDiv from "../../components/UI/contentDiv/ContentDiv";
import classes from "./ProductPage.module.css";

const ProductPage = () => {
    const params = useParams()
    const product = ProductService.getProductByID(params.id);

    return (
        <ContentDiv>
            <h2>{product.name}</h2>
            <div className={classes.parentContainer}>
                <img className={classes.img} src={product.image} alt={product.name}/>
                <div className={classes.descriptionContainer}>
                    <p className={classes.description}>{product.description}</p>
                    <div className={classes.buttonsAndPriceContainer}>
                        <div className={classes.price}>{product.price + "₽"}</div>
                        <div className={classes.buttonsContainer}>
                            <MyButton>
                                В избранное
                            </MyButton>
                            <MyButton>
                                В корзину
                            </MyButton>
                        </div>
                    </div>
                </div>
            </div>
        </ContentDiv>
    );
};

export default ProductPage;