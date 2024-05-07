import React, {useEffect, useState} from 'react';
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import LocalStorage from "../util/localStorage";
import CartItemList from "../components/cartItemsList/CartItemList";
import OrderForm from "../components/orderForm/OrderForm";

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cartItems = LocalStorage.setCartItems();

    const [cart, setCart] = useState(cartItems);

    const clearCart = () => {
        LocalStorage.clearCart();
        setCart([])
    }

    const removeProduct = (product) => {
        setCart(cart.filter(p => p.id !== product.id))
    }

    return (
        <div>
            <ContentDiv>
                <h1>Корзина</h1>
                <CartItemList
                    cart={cart}
                    remove={removeProduct}
                />
            </ContentDiv>
            {cart.length !== 0 &&
                <ContentDiv>
                    <h1>Оформление заказа</h1>
                    <OrderForm clearCart={clearCart}/>
                </ContentDiv>
            }
        </div>
    );
};

export default Cart;