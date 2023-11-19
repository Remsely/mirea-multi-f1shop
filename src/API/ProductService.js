import {dataBase} from "./dataBase";

export default class ProductService {
    static getProductByID(id) {
        return dataBase.find(product => product.id === parseInt(id));
    }
}