import AuthService from "./AuthService";
import axios from "axios";

export const createOrder = (order) => {
    let config = {
        method: 'post',
        maxBody: Infinity,
        url: `/orders`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AuthService.getToken()}`,
        },
        data: order
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
