import axios from "axios";

const API_URL = 'http://localhost:8080/auth/';

const register = (email, password) => {
    return axios
        .post(API_URL + 'register', {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response;
        });
};

const login = (email, password) => {
    localStorage.removeItem('user');
    return axios
        .post(API_URL + 'login', {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getToken = () => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
        const userObject = JSON.parse(userJson);
        return userObject.accessToken || null;
    }
    return null;
}

export default {
    register,
    login,
    logout,
    getToken
};