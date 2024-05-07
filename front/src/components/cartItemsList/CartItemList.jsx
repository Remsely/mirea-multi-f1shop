import React, {useState} from 'react';
import CartItem from "../UI/cartItem/CartItem";
import classes from "./CartItemList.module.css";
import LocalStorage from "../../util/localStorage";

const CartItemList = ({cart, remove}) => {
    const calculateTotal = () => {
        return LocalStorage.setCartItems().reduce((total, item) => {
            const productTotal = item.price * item.count;
            return total + productTotal;
        }, 0);
    };

    const [fullPrice, setFullPrice] = useState(calculateTotal(cart));

    function updatePrice() {
        setFullPrice(calculateTotal(cart));
    }

    return (
        cart.length
            ? <div className={classes.container}>
                {cart.map(cartItem =>
                    <CartItem
                        key={cartItem.id}
                        item={cartItem}
                        remove={remove}
                        updateFullPrice={updatePrice}
                    />)
                }
                <div className={classes.fullPrice}>{"Итого: " + fullPrice + "₽"}</div>
            </div>
            : <div>Товары не найдены...</div>
    );
};

export default CartItemList;