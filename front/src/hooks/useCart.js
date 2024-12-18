import {useCallback, useContext, useState} from "react";
import {CartContext, WishlistContext} from "../context";
import {useFetching} from "./useFetching";
import CartService from "../service/CartService";

export const useCart = (productInstance, setProductInstance) => {
    const [inCart, setInCart] = useState(productInstance.inCart);
    const [inWishlist, setInWishlist] = useState(productInstance.inWishlist);

    const {setCartSize} = useContext(CartContext);
    const {setWishlistSize} = useContext(WishlistContext);

    const changeCartSize = useCallback((delta) => {
        setCartSize((size) => size + delta);
    }, [setCartSize]);

    const changeWishlistSize = useCallback((delta) => {
        setWishlistSize((size) => size + delta);
    }, [setWishlistSize]);

    const addToCartFetching = useFetching(async () => {
        let p = await CartService.addToCartInProductPage(productInstance.id, 1);
        setProductInstance(p);
        setInCart(p.inCart);
        setInWishlist(p.inWishlist);
        changeCartSize(1);
        changeWishlistSize(1);
    });

    const removeFromCartFetching = useFetching(async () => {
        let p = await CartService.removeFromCart(productInstance.id);
        setProductInstance(p);
        setInCart(p.inCart);
        setInWishlist(p.inWishlist);
        changeCartSize(-1);
    });

    return {
        productInstance,
        inCart,
        addToCartFetching,
        removeFromCartFetching
    };
}