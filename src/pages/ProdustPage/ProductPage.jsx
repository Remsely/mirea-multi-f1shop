import React from 'react';
import {useParams} from "react-router-dom";
import ProductService from "../../API/ProductService";

const ProductPage = () => {
    const params = useParams()
    const product = ProductService.getProductByID(params.id);

    return (
        <div>
            <h1>Страница товара с id = {params.id}</h1>
            <img src={product.image} alt={product.name}/>
            <div>{product.name}</div>
            <div>{product.price}</div>
        </div>
    );
};

export default ProductPage;