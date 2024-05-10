import React from 'react';
import classes from "./ProductInfo.module.css";
import MyCheckedButton from "../UI/buttons/checkedButton/MyCheckedButton";
import MyButton from "../UI/buttons/commonButton/MyButton";
import {useNavigate} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {CircularProgress} from "@mui/material";
import {useWishlist} from "../../hooks/useWishlist";

const ProductInfo = ({product, setProduct}) => {
    const router = useNavigate();
    const {
        productInstance,
        inWishlist,
        addToWishlistFetching: [addToWishlist, isWishlistAdditionLoading],
        removeFromWishlistFetching: [removeFromWishlist, isWishlistRemovalLoading]
    } = useWishlist(product);

    const [addToCart, isCartAdditionLoading, cartAdditionError] = useFetching(async () => {

    });
    const [removeFromCart, isCartRemovalLoading, cartRemovalError] = useFetching(async () => {

    });

    // function handleCartAction() {
    //     inCart ? LocalStorage.removeFromCart(productInstance.id) : LocalStorage.addToCart(productInstance.id);
    //     setInCart(!inCart);
    // }
    //
    // function handleWishlistAction() {
    //     inWishlist
    //         ? LocalStorage.removeFromWishlist(productInstance.id)
    //         : LocalStorage.addToWishlist(productInstance.id);
    //     setInWishlist(!inWishlist);
    // }

    return (
        <div className={classes.parentContainer}>
            <img className={classes.img} src={"../" + productInstance.image} alt={productInstance.name}/>
            <div className={classes.descriptionContainer}>
                <p className={classes.description}>{productInstance.description}</p>
                <div className={classes.buttonsAndPriceContainer}>
                    <div className={classes.price}>{productInstance.price + "₽"}</div>
                    <div className={classes.buttonsContainer}>
                        {inWishlist
                            ? isWishlistRemovalLoading
                                ?
                                <MyCheckedButton onClick={addToWishlist}>
                                    <CircularProgress style={{color: 'black'}} size={14}/>
                                </MyCheckedButton>
                                :
                                <MyCheckedButton onClick={removeFromWishlist}>В избранном</MyCheckedButton>
                            : isWishlistAdditionLoading
                                ?
                                <MyButton onClick={addToWishlist}>
                                    <CircularProgress style={{color: 'white'}} size={14}/>
                                </MyButton>
                                :
                                <MyButton onClick={addToWishlist}>В избранное</MyButton>
                        }
                        {1 === 1
                            ? <MyCheckedButton onClick={() => {
                            }}>В корзине</MyCheckedButton>
                            : <MyButton onClick={() => {
                            }}>В корзину</MyButton>
                        }
                    </div>
                </div>
                <img
                    className={classes.wishListIcon}
                    src={"../../F1Shop/icons/close.svg"}
                    alt={"name"}
                    onClick={() => router(-1)}
                />
            </div>
        </div>
    );
};

export default ProductInfo;