import './styles/App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";
import Footer from "./components/UI/footer/Footer";
import {AuthContext, WishlistContext} from "./context";
import {useEffect, useState} from "react";
import AuthService from "./service/AuthService";
import axios from "axios";
import WishlistService from "./service/WishlistService";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
    const [isAuth, setIsAuth] = useState(() => {
        const token = AuthService.getToken();
        return token !== null && token !== undefined
    });

    const [wishlistSize, setWishlistSize] = useState(0);

    useEffect(() => {
        fetchWishlistCount();
    }, []);

    const fetchWishlistCount = async () => {
        const wishlistItems = await WishlistService.getWishlist();
        setWishlistSize(wishlistItems.length);
    };

    return (
        <WishlistContext.Provider value={{wishlistSize: wishlistSize, setWishlistSize: setWishlistSize}}>
            <AuthContext.Provider value={{isAuth, setIsAuth}}>
                <div className="App">
                    <NavBar/>
                    <AppRouter/>
                    <Footer/>
                </div>
            </AuthContext.Provider>
        </WishlistContext.Provider>
    );
}

export default App;
