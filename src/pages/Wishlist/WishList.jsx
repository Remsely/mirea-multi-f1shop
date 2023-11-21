import React from 'react';
import {dataBase} from "../../API/dataBase";
import LocalStorage from "../../util/localStorage";
import ContentDiv from "../../components/UI/contentDiv/ContentDiv";
import ProductsList from "../../components/productList/ProductsList";

const WishList = () => {
    const wishlistProductsIDs = LocalStorage.getWishlistIDs();
    const wishlistProducts = [...dataBase].filter(product => wishlistProductsIDs.includes(product.id));

    return (
        <ContentDiv>
            <h2>Избранное</h2>
            <ProductsList productList={wishlistProducts}/>
        </ContentDiv>
    );
};

export default WishList;