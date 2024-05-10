import AuthService from "./AuthService";
import axios from "axios";
import ProductService from "./ProductService";

const addToCartInCart = (productId, count) => {
    let config = {
        method: 'put',
        maxBody: Infinity,
        url: `/products/${productId}/cart?amount=${count}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AuthService.getToken()}`,
        }
    }
    return axios.request(config)
        .then(r => {
            if (r.status === 200) {
                return r.data;
            } else {
                return null
            }
        });
}

const addToCartInProductPage = async (productId, count) => {
    await addToCartInCart(productId, count);
    return ProductService.getProductByID(productId);
}

const removeFromCart = async (productId) => {
    let config = {
        method: 'delete',
        maxBody: Infinity,
        url: `/products/${productId}/cart`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AuthService.getToken()}`,
        }
    }
    await axios.request(config);
    return ProductService.getProductByID(productId);
}

const getCart = () => {
    let config = {
        method: 'get',
        maxBody: Infinity,
        url: `/products/cart`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AuthService.getToken()}`,
        }
    }
    return axios.request(config)
        .then(r => {
            if (r.status === 200) {
                return r.data;
            } else {
                return null
            }
        });
}

export default {
    getCart,
    removeFromCart,
    addToCartInCart,
    addToCartInProductPage
}