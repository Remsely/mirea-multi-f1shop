import {dataBase} from "../api/dataBase";
import {triggerEvent} from "./events";

export default class LocalStorage {
    static addToCart(id) {
        const storedData = this.getCartIDs();
        if (!this.isInCart(id)) {
            storedData.push({id: id, count: 1});
            localStorage.setItem("cart", JSON.stringify(storedData))
            triggerEvent("cartChanged");
        }
    }

    static addToWishlist(id) {
        const storedData = this.getWishlistIDs();
        if (!storedData.includes(id)) {
            storedData.push(id);
            localStorage.setItem("wishlist", JSON.stringify(storedData))
            triggerEvent("wishlistChanged");
        }
    }

    static removeFromCart(id) {
        const storedData = this.getCartIDs();
        const updatedData = storedData.filter(obj => obj.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedData));
        triggerEvent("cartChanged");
    }

    static removeFromWishlist(id) {
        const storedData = this.getWishlistIDs();
        const updatedData = storedData.filter(storedId => storedId !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedData));
        triggerEvent("wishlistChanged");
    }

    static findIdInCart(cartItems, id) {
        return cartItems.findIndex(item => item.id === id);
    }

    static isInCart(id) {
        const cartItems = this.getCartIDs();
        const selectedItemIndex = this.findIdInCart(cartItems, id);
        return selectedItemIndex !== -1;
    }

    static isInWishlist(id) {
        const storedData = this.getWishlistIDs();
        return storedData.includes(id);
    }

    static increaseInCart(id) {
        const cartItems = this.getCartIDs();
        const selectedItemIndex = this.findIdInCart(cartItems, id);

        if (selectedItemIndex !== -1) {
            cartItems[selectedItemIndex].count = parseInt(cartItems[selectedItemIndex].count) + 1;
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
    }

    static decreaseInCart(id) {
        const cartItems = this.getCartIDs();
        const selectedItemIndex = this.findIdInCart(cartItems, id);

        if (selectedItemIndex !== -1) {
            cartItems[selectedItemIndex].count = parseInt(cartItems[selectedItemIndex].count) - 1;
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
    }

    static getWishlistIDs() {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    }

    static getCartIDs() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    static setCartItems() {
        const cartObjects = LocalStorage.getCartIDs();

        return LocalStorage.getCartIDs().length ? cartObjects.map(({id, count}) => {
            const databaseItem = dataBase.find(item => item.id === id);
            if (databaseItem) {
                const {name, image, price} = databaseItem;
                return {id: id, name: name, image: image, price: price, count: count}
            }
            return null;
        }) : [];
    }

    static clearCart() {
        localStorage.removeItem("cart");
        triggerEvent("cartChanged");
    }
}