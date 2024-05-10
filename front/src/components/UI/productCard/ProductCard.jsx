import React, {useState} from 'react';
import classes from "./ProductCard.module.css";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useWishlist} from "../../../hooks/useWishlist";

const ProductCard = ({product, remove}) => {
    const [productInstance, setProductInstance] = useState(product);
    const router = useNavigate()
    const {
        inWishlist,
        addToWishlistFetching: [addToWishlist, isWishlistAdditionLoading],
        removeFromWishlistFetching: [removeFromWishlist, isWishlistRemovalLoading]
    } = useWishlist(product, setProductInstance);

    function handleWishlistAction(e) {
        e.stopPropagation()
        if (inWishlist) {
            removeFromWishlist(productInstance.id);
            remove(productInstance);
        } else {
            addToWishlist(productInstance.id);
        }
    }

    return (
        <div className={classes.card} onClick={() => router(`/catalog/${productInstance.id}`)}>
            {inWishlist
                ? isWishlistRemovalLoading
                    ? <CircularProgress style={{color: 'black'}} size={0.4}/>
                    : <img
                        className={classes.wishListIcon}
                        src={"../F1Shop/icons/love-active.svg"}
                        alt={"name"}
                        onClick={handleWishlistAction}
                    />
                : isWishlistAdditionLoading
                    ? <CircularProgress style={{color: 'black'}} size={0.4}/>
                    : <img
                        className={classes.wishListIcon}
                        src={"../F1Shop/icons/love-inactive.svg"}
                        alt={"name"}
                        onClick={handleWishlistAction}
                    />
            }
            <img className={classes.image} src={productInstance.image} alt={productInstance.name}/>
            <div className={classes.name}>{productInstance.name}</div>
            <div className={classes.price}> {productInstance.price + "₽"}</div>
        </div>
    );
};

export default ProductCard;