import React, {useEffect, useState} from 'react';
import CartItem from "../UI/cartItem/CartItem";
import classes from "./CartItemList.module.css";

const CartItemList = ({cart, setCart}) => {
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const productTotal = item.price * item.amount;
            return total + productTotal;
        }, 0);
    };

    const [fullPrice, setFullPrice] = useState(0);

    useEffect(() => {
        setFullPrice(calculateTotal());
    }, [cart]);

    const removeProduct = (product) => {
        setCart(cart.filter(p => p.id !== product.id))
    }

    const updateCart = (changedItem) => {
        const itemIndex = cart.findIndex(item => item.id === changedItem.id);

        const updatedCartItems = [
            ...cart.slice(0, itemIndex),
            changedItem,
            ...cart.slice(itemIndex + 1)
        ];
        setCart(updatedCartItems);
    }

    return (
        cart.length
            ? <div className={classes.container}>
                {cart.map(cartItem =>
                    <CartItem
                        key={cartItem.id}
                        item={cartItem}
                        remove={removeProduct}
                        updateCart={updateCart}
                    />)
                }
                <div className={classes.fullPrice}>{"Итого: " + fullPrice + "₽"}</div>
            </div>
            : <div>Товары не найдены...</div>
    );
};

export default CartItemList;