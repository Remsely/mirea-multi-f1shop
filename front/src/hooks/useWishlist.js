import {useCallback, useContext, useState} from "react";
import {useFetching} from "./useFetching";
import WishlistService from "../service/WishlistService";
import {WishlistContext} from "../context";

export const useWishlist = (productInstance, setProductInstance) => {
    const [inWishlist, setInWishlist] = useState(productInstance.inWishlist);
    const {setWishlistSize} = useContext(WishlistContext);

    const changeWishlistSize = useCallback((delta) => {
        setWishlistSize((size) => size + delta);
    }, [setWishlistSize]);

    const addToWishlistFetching = useFetching(async () => {
        let p = await WishlistService.addToWishlist(productInstance.id);
        setProductInstance(p);
        setInWishlist(p.inWishlist);
        changeWishlistSize(1);
    });

    const removeFromWishlistFetching = useFetching(async () => {
        let p = await WishlistService.removeFromWishlist(productInstance.id);
        setProductInstance(p);
        setInWishlist(p.inWishlist);
        changeWishlistSize(-1);
    });

    return {
        productInstance,
        inWishlist,
        addToWishlistFetching,
        removeFromWishlistFetching
    };
}