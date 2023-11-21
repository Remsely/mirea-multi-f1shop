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
                            imgURL={product.image}
                            name={product.name}
                            price={product.price + "₽"}
                            id={product.id}
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