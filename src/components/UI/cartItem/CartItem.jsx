import React, {useState} from 'react';
import classes from "./CartItem.module.css";
import CartButton from "../buttons/cartButtons/CartButton";
import LocalStorage from "../../../util/localStorage";
import {useNavigate} from "react-router-dom";

const CartItem = ({item, remove, updateFullPrice}) => {
    const router = useNavigate()
    const [count, setCount] = useState(item.count);
    const [price, setPrice] = useState(item.price * item.count);

    function removeItem(e) {
        e.stopPropagation();
        LocalStorage.removeFromCart(item.id);
        remove(item);
        updateFullPrice();
    }

    function minusCount(e) {
        e.stopPropagation();
        setCount(count - 1);
        LocalStorage.decreaseInCart(item.id);
        setPrice(price - item.price);
        updateFullPrice();
    }

    function plusCount(e) {
        e.stopPropagation();
        setCount(count + 1);
        LocalStorage.increaseInCart(item.id);
        setPrice(price + item.price);
        updateFullPrice();
    }

    return (
        <div className={classes.container} onClick={() => router(`/catalog/${item.id}`)}>
            <img className={classes.img} src={item.image} alt={item.name}/>
            <div className={classes.specifiesContainer}>
                <div className={classes.nameAndDelContainer}>
                    <div className={classes.name}>{item.name}</div>
                    <CartButton style={{padding: "3px"}} icon={"../icons/close.svg"} onClick={removeItem}/>
                </div>
                <div className={classes.priceAndCountContainer}>
                    <div className={classes.price}>{price + "₽"}</div>
                    <div className={classes.countContainer}>
                        {count > 1 && <CartButton icon={"../icons/minus.svg"} onClick={minusCount}/>}
                        <div className={classes.count}>{count}</div>
                        <CartButton icon={"../icons/plus.svg"} onClick={plusCount}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;