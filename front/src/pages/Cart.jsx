import React, {useContext, useEffect, useState} from 'react';
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import CartItemList from "../components/cartItemsList/CartItemList";
import OrderForm from "../components/orderForm/OrderForm";
import {useFetching} from "../hooks/useFetching";
import CartService from "../service/CartService";
import {CircularProgress} from "@mui/material";
import CenteredDiv from "../components/UI/alignCenterDiv/CenteredDiv";
import {CartContext} from "../context";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const {setCartSize} = useContext(CartContext);

    const [fetchCart, isLoading, error] = useFetching(async () => {
        const cartItems = await CartService.getCart();
        setCart(cartItems);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCart();
    }, []);

    const clearCart = () => {
        setCart([]);
        setCartSize(0);
    }

    return (
        isLoading
            ? <CenteredDiv>
                <CircularProgress style={{color: 'black'}}/>
            </CenteredDiv>
            : error
                ? <h2>Ошибка при загрузке корзины: {error}</h2>
                : <div>
                    <ContentDiv>
                        <h1>Корзина</h1>
                        <CartItemList
                            cart={cart}
                            setCart={setCart}
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