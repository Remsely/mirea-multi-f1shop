import {createContext} from "react";

export const AuthContext = createContext(null);

export const WishlistContext = createContext({
    wishlistSize: 0,
    setWishlistSize: () => {}
});

export const CartContext = createContext(0);