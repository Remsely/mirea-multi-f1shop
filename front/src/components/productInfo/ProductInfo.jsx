import React from 'react';
import classes from "./ProductInfo.module.css";
import MyCheckedButton from "../UI/buttons/checkedButton/MyCheckedButton";
import MyButton from "../UI/buttons/commonButton/MyButton";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useWishlist} from "../../hooks/useWishlist";
import {useCart} from "../../hooks/useCart";

const ProductInfo = ({product, setProduct}) => {
    const router = useNavigate();
    const {
        inWishlist,
        addToWishlistFetching: [addToWishlist, isWishlistAdditionLoading],
        removeFromWishlistFetching: [removeFromWishlist, isWishlistRemovalLoading]
    } = useWishlist(product, setProduct);

    const {
        inCart,
        addToCartFetching: [addToCart, isCartAdditionLoading],
        removeFromCartFetching: [removeFromCart, isCartRemovalLoading]
    } = useCart(product, setProduct);

    return (
        <div className={classes.parentContainer}>
            <img className={classes.img} src={product.image} alt={product.name}/>
            <div className={classes.descriptionContainer}>
                <p className={classes.description}>{product.description}</p>
                <div className={classes.buttonsAndPriceContainer}>
                    <div className={classes.price}>{product.price + "₽"}</div>
                    <div className={classes.buttonsContainer}>
                        {product.inWishlist
                            ? isWishlistRemovalLoading
                                ?
                                <MyCheckedButton>
                                    <CircularProgress style={{color: 'black'}} size={14}/>
                                </MyCheckedButton>
                                :
                                <MyCheckedButton onClick={removeFromWishlist}>В избранном</MyCheckedButton>
                            : isWishlistAdditionLoading
                                ?
                                <MyButton>
                                    <CircularProgress style={{color: 'white'}} size={14}/>
                                </MyButton>
                                :
                                <MyButton onClick={addToWishlist}>В избранное</MyButton>
                        }
                        {inCart
                            ? isCartRemovalLoading
                                ?
                                <MyCheckedButton>
                                    <CircularProgress style={{color: 'black'}} size={14}/>
                                </MyCheckedButton>
                                :
                                <MyCheckedButton onClick={removeFromCart}>В корзине</MyCheckedButton>
                            : isCartAdditionLoading
                                ?
                                <MyButton>
                                    <CircularProgress style={{color: 'white'}} size={14}/>
                                </MyButton>
                                :
                                <MyButton onClick={addToCart}>В корзину</MyButton>
                        }
                    </div>
                </div>
                <img
                    className={classes.wishListIcon}
                    src={"/icons/close.svg"}
                    alt={"name"}
                    onClick={() => router(-1)}
                />
            </div>
        </div>
    );
};

export default ProductInfo;