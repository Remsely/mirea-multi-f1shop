import React, {useState} from 'react';
import {dataBase} from "../../API/dataBase";
import LocalStorage from "../../util/localStorage";
import ContentDiv from "../../components/UI/contentDiv/ContentDiv";
import ProductsList from "../../components/productList/ProductsList";

const WishList = () => {
    const wishlistProductsIDs = LocalStorage.getWishlistIDs();
    const wishlistProducts = [...dataBase].filter(product => wishlistProductsIDs.includes(product.id));
    const [wishList, setWishList] = useState(wishlistProducts);

    const removeProduct = (product) => {
        setWishList(wishList.filter(p => p.id !== product.id))
    }

    return (
        <ContentDiv>
            <h2>Избранное</h2>
            <ProductsList
                productList={wishList}
                remove={removeProduct}
            />
        </ContentDiv>
    );
};

export default WishList;