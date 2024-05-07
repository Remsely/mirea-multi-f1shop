import React, {useEffect, useState} from 'react';
import {dataBase} from "../API/dataBase";
import LocalStorage from "../util/localStorage";
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import ProductsList from "../components/productList/ProductsList";

const WishList = () => {
    const wishlistProductsIDs = LocalStorage.getWishlistIDs();
    const wishlistProducts = [...dataBase].filter(product => wishlistProductsIDs.includes(product.id));
    const [wishList, setWishList] = useState(wishlistProducts);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const removeProduct = (product) => {
        setWishList(wishList.filter(p => p.id !== product.id))
    }

    return (
        <ContentDiv>
            <h1>Избранное</h1>
            <ProductsList
                productList={wishList}
                remove={removeProduct}
            />
        </ContentDiv>
    );
};

export default WishList;