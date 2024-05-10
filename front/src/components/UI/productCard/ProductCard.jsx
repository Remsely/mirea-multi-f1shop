import React, {useState} from 'react';
import classes from "./ProductCard.module.css";
import {useNavigate} from "react-router-dom";
import LocalStorage from "../../../util/localStorage";

const ProductCard = ({product, remove}) => {
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
        <div className={classes.card} onClick={() => router(`/catalog/${product.id}`)}>
            {inWishlist
                ? <img
                    className={classes.wishListIcon}
                    src={"../F1Shop/icons/love-active.svg"}
                    alt={"name"}
                    onClick={handleWishlistAction}
                />
                : <img
                    className={classes.wishListIcon}
                    src={"../F1Shop/icons/love-inactive.svg"}
                    alt={"name"}
                    onClick={handleWishlistAction}
                />
            }
            <img className={classes.image} src={product.image} alt={product.name}/>
            <div className={classes.name}>{product.name}</div>
            <div className={classes.price}> {product.price + "₽"}</div>
        </div>
    );
};

export default ProductCard;