import './styles/App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";
import Footer from "./components/UI/footer/Footer";
import {AuthContext, CartContext, WishlistContext} from "./context";
import {useEffect, useState} from "react";
import AuthService from "./service/AuthService";
import axios from "axios";
import WishlistService from "./service/WishlistService";
import CartService from "./service/CartService";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
    const [isAuth, setIsAuth] = useState(() => {
        const token = AuthService.getToken();
        return token !== null && token !== undefined
    });

    const [wishlistSize, setWishlistSize] = useState(0);
    const [cartSize, setCartSize] = useState(0);

    useEffect(() => {
        fetchWishlistCount();
        fetchCartCount();
    }, []);

    const fetchWishlistCount = async () => {
        const wishlistItems = await WishlistService.getWishlist();
        setWishlistSize(wishlistItems.length);
    };

    const fetchCartCount = async () => {
        const cartItems = await CartService.getCart();
        setCartSize(cartItems.length);
    };

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <CartContext.Provider value={{cartSize, setCartSize}}>
                <WishlistContext.Provider value={{wishlistSize, setWishlistSize}}>
                    <div className="App">
                        <NavBar/>
                        <AppRouter/>
                        <Footer/>
                    </div>
                </WishlistContext.Provider>
            </CartContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
