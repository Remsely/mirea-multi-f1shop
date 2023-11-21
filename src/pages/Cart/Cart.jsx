import React, {useState} from 'react';
import ContentDiv from "../../components/UI/contentDiv/ContentDiv";
import LocalStorage from "../../util/localStorage";
import CartItemList from "../../components/cartItemsList/CartItemList";

const Cart = () => {
    const cartItems = LocalStorage.setCartItems();

    const [cart, setCart] = useState(cartItems);

    const removeProduct = (product) => {
        setCart(cart.filter(p => p.id !== product.id))
    }

    return (
        <ContentDiv>
            <h1>Корзина</h1>
            <CartItemList
                cart={cart}
                remove={removeProduct}
            />
        </ContentDiv>
    );
};

export default Cart;