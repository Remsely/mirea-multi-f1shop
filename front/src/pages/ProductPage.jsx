import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ProductService from "../service/ProductService";
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import ProductInfo from "../components/productInfo/ProductInfo";
import {CircularProgress} from "@mui/material";
import CenteredDiv from "../components/UI/alignCenterDiv/CenteredDiv";
import {useFetching} from "../hooks/useFetching";

const ProductPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [fetchProduct, isLoading, error] = useFetching(async () => {
        let p = await ProductService.getProductByID(params.id);
        setProduct(p);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProduct();
    }, []);

    return (
        <div>
            {isLoading || !product
                ? <CenteredDiv>
                    <CircularProgress style={{color: 'black'}}/>
                </CenteredDiv>
                : error ?
                    <h2>Ошибка при загрузке товара: {error}</h2>
                    : <ContentDiv>
                        <h2>{product.name}</h2>
                        <ProductInfo
                            product={product}
                            setProduct={setProduct}
                        />
                    </ContentDiv>
            }
        </div>
    );
};

export default ProductPage;