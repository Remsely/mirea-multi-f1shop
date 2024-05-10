import {useCallback, useContext, useState} from "react";
import {CartContext} from "../context";
import {useFetching} from "./useFetching";
import CartService from "../service/CartService";

export const useCart = (productInstance, setProductInstance) => {
    const [inCart, setInCart] = useState(productInstance.inCart);
    const {setCartSize} = useContext(CartContext);

    const changeCartSize = useCallback((delta) => {
        setCartSize((size) => size + delta);
    }, [setCartSize]);

    const addToCartFetching = useFetching(async () => {
        let p = await CartService.addToCartInProductPage(productInstance.id, 1);
        setProductInstance(p);
        setInCart(p.inCart);
        changeCartSize(1);
    });

    const removeFromCartFetching = useFetching(async () => {
        let p = await CartService.removeFromCart(productInstance.id);
        setProductInstance(p);
        setInCart(p.inCart);
        changeCartSize(-1);
    });

    return {
        productInstance,
        inCart,
        addToCartFetching,
        removeFromCartFetching
    };
}