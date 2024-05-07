import React, {useState} from 'react';
import classes from "./ProductInfo.module.css";
import MyCheckedButton from "../UI/buttons/checkedButton/MyCheckedButton";
import MyButton from "../UI/buttons/commonButton/MyButton";
import LocalStorage from "../../util/localStorage";
import {useNavigate} from "react-router-dom";

const ProductInfo = ({product}) => {
    const [inCart, setInCart] = useState(LocalStorage.isInCart(product.id));
    const [inWishlist, setInWishlist] = useState(LocalStorage.isInWishlist(product.id));
    const router = useNavigate()

    function handleCartAction() {
        inCart ? LocalStorage.removeFromCart(product.id) : LocalStorage.addToCart(product.id);
        setInCart(!inCart);
    }

    function handleWishlistAction() {
        inWishlist ? LocalStorage.removeFromWishlist(product.id) : LocalStorage.addToWishlist(product.id);
        setInWishlist(!inWishlist);
    }

    return (
        <div className={classes.parentContainer}>
            <img className={classes.img} src={"../" + product.image} alt={product.name}/>
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