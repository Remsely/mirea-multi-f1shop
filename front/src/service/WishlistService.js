import AuthService from "./AuthService";
import axios from "axios";

const addToWishlist = (productId) => {
    let config = {
        method: 'put',
        maxBody: Infinity,
        url: `/products/${productId}/wishlist`,
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

const removeFromWishlist = (productId) => {
    let config = {
        method: 'delete',
        maxBody: Infinity,
        url: `/products/${productId}/wishlist`,
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

const getWishlist = () => {
    let config = {
        method: 'get',
        maxBody: Infinity,
        url: `/products/wishlist`,
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
    getWishlist,
    removeFromWishlist,
    addToWishlist
}