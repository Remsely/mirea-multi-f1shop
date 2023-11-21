import React, {useState} from 'react';
import classes from "./ProductCard.module.css";
import {useNavigate} from "react-router-dom";
import LocalStorage from "../../../util/localStorage";
import ProductService from "../../../API/ProductService";

const ProductCard = ({imgURL, name, price, id, remove}) => {
    const product = ProductService.getProductByID(id);
    const [inWishlist, setInWishlist] = useState(LocalStorage.isInWishlist(product.id));
    const router = useNavigate()

    function handleWishlistAction(e) {
        e.stopPropagation();
        if (inWishlist) {
            LocalStorage.removeFromWishlist(product.id)
            remove(product);
        } else {
            LocalStorage.addToWishlist(product.id);
        }
        setInWishlist(!inWishlist);
    }

    return (
        <div className={classes.card} onClick={() => router(`/catalog/${id}`)}>
            {inWishlist
                ? <img
                    className={classes.wishListIcon}
                    src={"../icons/love-active.svg"}
                    alt={"name"}
                    onClick={handleWishlistAction}
                />
                : <img
                    className={classes.wishListIcon}
                    src={"../icons/love-inactive.svg"}
                    alt={"name"}
                    onClick={handleWishlistAction}
                />
            }
            <img className={classes.image} src={imgURL} alt={name}/>
            <div className={classes.name}>{name}</div>
            <div className={classes.price}> {price}</div>
        </div>
    );
};

export default ProductCard;