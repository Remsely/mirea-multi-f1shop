import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import ProductService from "../../API/ProductService";
import MyButton from "../../components/UI/buttons/commonButton/MyButton";
import ContentDiv from "../../components/UI/contentDiv/ContentDiv";
import classes from "./ProductPage.module.css";
import LocalStorage from "../../util/localStorage";
import MyCheckedButton from "../../components/UI/buttons/checkedButton/MyCheckedButton";

const ProductPage = () => {
    const params = useParams()
    const product = ProductService.getProductByID(params.id);
    const [inCart, setInCart] = useState(LocalStorage.isInCart(product.id));
    const [inWishlist, setInWishlist] = useState(LocalStorage.isInWishlist(product.id));

    function handleCartAction() {
        inCart ? LocalStorage.removeFromCart(product.id) : LocalStorage.addToCart(product.id);
        setInCart(!inCart);
    }

    function handleWishlistAction() {
        inWishlist ? LocalStorage.removeFromWishlist(product.id) : LocalStorage.addToWishlist(product.id);
        setInWishlist(!inWishlist);
    }

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
                            {inWishlist
                                ? <MyCheckedButton onClick={handleWishlistAction}>В избранном</MyCheckedButton>
                                : <MyButton onClick={handleWishlistAction}>В избранное</MyButton>
                            }
                            {inCart
                                ? <MyCheckedButton onClick={handleCartAction}>В корзине</MyCheckedButton>
                                : <MyButton onClick={handleCartAction}>В корзину</MyButton>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ContentDiv>
    );
};

export default ProductPage;