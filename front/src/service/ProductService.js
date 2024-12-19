import AuthService from "./AuthService";
import axios from "axios";

const getProductByID = (id) => {
    let config = {
        method: 'get',
        maxBody: Infinity,
        url: `/products/${id}`,
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

const getProducts = (categories, searchQuery, sortOrder) => {
    let config = {
        method: 'get',
        maxBody: Infinity,
        url: '/products',
        params: {
            categories: categories.join(','),
            searchQuery: searchQuery,
            sortOrder: sortOrder
        },
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
                return []
            }
        });
}

const ProductService = {
    getProducts,
    getProductByID
};

export default ProductService;