import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import ProductService from "../service/ProductService";
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import ProductInfo from "../components/productInfo/ProductInfo";

const ProductPage = () => {
    const params = useParams()
    const product = ProductService.getProductByID(params.id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ContentDiv>
            <h2>{product.name}</h2>
            <ProductInfo product={product}/>
        </ContentDiv>
    );
};

export default ProductPage;