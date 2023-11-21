export default class LocalStorage {
    static addToCart(id) {
        const storedData = JSON.parse(localStorage.getItem("cart")) || [];
        if (!this.isInCart(id)) {
            storedData.push({id: id, count: 1});
            localStorage.setItem("cart", JSON.stringify(storedData))
        }
    }

    static addToWishlist(id) {
        const storedData = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (!storedData.includes(id)) {
            storedData.push(id);
            localStorage.setItem("wishlist", JSON.stringify(storedData))
        }
    }

    static removeFromCart(id) {
        const storedData = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(storedData);
        const updatedData = storedData.filter(obj => obj.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedData));
    }

    static removeFromWishlist(id) {
        const storedData = JSON.parse(localStorage.getItem("wishlist")) || [];
        const updatedData = storedData.filter(storedId => storedId !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedData));
    }

    static findIdInCart(cartItems, id) {
        return cartItems.findIndex(item => item.id === id);
    }

    static isInCart(id) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const selectedItemIndex = this.findIdInCart(cartItems, id);
        return selectedItemIndex !== -1;
    }

    static isInWishlist(id) {
        const storedData = JSON.parse(localStorage.getItem("wishlist")) || [];
        return storedData.includes(id);
    }

    static increaseInCart(id) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const selectedItemIndex = this.findIdInCart(cartItems, id);

        if (selectedItemIndex !== -1) {
            cartItems[selectedItemIndex].count = parseInt(cartItems[selectedItemIndex].count) + 1;
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
    }

    static decreaseInCart(id) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const selectedItemIndex = this.findIdInCart(cartItems, id);

        if (selectedItemIndex !== -1) {
            cartItems[selectedItemIndex].count = parseInt(cartItems[selectedItemIndex].count) - 1;
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
    }
}