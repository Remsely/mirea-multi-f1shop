import React, {useEffect, useState} from 'react';
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import ProductsList from "../components/productList/ProductsList";
import {useFetching} from "../hooks/useFetching";
import {CircularProgress} from "@mui/material";
import CenteredDiv from "../components/UI/alignCenterDiv/CenteredDiv";
import WishlistService from "../service/WishlistService";

const WishList = () => {
    const [wishList, setWishList] = useState([]);

    const [fetchProducts, isLoading, error] = useFetching(async () => {
        const gottenProducts = await WishlistService.getWishlist();
        setWishList(gottenProducts);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, []);

    const removeProduct = (product) => {
        setWishList(wishList.filter(p => p.id !== product.id))
    }

    return (
        <ContentDiv>
            <h1>Избранное</h1>
            {isLoading
                ? <CenteredDiv>
                    <CircularProgress style={{color: 'black'}}/>
                </CenteredDiv>
                : error
                    ? <h2>Ошибка при загрузке избранного: {error}</h2>
                    : <ProductsList
                        productList={wishList}
                        remove={removeProduct}
                    />
            }
        </ContentDiv>
    );
};

export default WishList;