import React from 'react';
import classes from "./ProductList.module.css";
import ProductCard from "../UI/productCard/ProductCard";

const ProductsList = ({productList, remove}) => {
    return (
        <div className={classes.container}>
            {productList.length
                ? <div className={classes.productList}>
                    {productList.map(product =>
                        <ProductCard
                            product={product}
                            key={product.id}
                            remove={remove}
                        />
                    )}
                </div>
                : <div>Товары не найдены...</div>}
        </div>
    );
};

export default ProductsList;