import React from 'react';
import classes from "../pages/Catalog/Catalog.module.css";
import ProductCard from "./UI/productCard/ProductCard";

const ProductsList = ({productList}) => {
    return (
        <div>
            {productList.length
                ? <div className={classes.productList}>
                    {productList.map(product =>
                        <ProductCard
                            imgURL={product.image}
                            name={product.name}
                            price={product.price + "₽"}
                            key={product.id}/>
                    )}
                </div>
                : <div>Товары не найдены...</div>}
        </div>
    );
};

export default ProductsList;