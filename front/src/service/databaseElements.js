import {dataBase} from "./dataBase";
import axios from "axios";
import AuthService from "./AuthService";

export const getAllProducts = () => {

    dataBase.forEach(element => {
        let config = {
            method: 'post',
            maxBody: Infinity,
            url: '/products',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getToken()}`,
            },
            data: element
        }
        console.log(AuthService.getToken())
        axios.request(config).then(r => console.log(r))
    })
}
