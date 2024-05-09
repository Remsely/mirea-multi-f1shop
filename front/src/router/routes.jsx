import Catalog from "../pages/Catalog";
import WishList from "../pages/WishList";
import Cart from "../pages/Cart";
import AboutUs from "../pages/AboutUs";
import ProductPage from "../pages/ProductPage";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";


export const privateRoutes = [
    {path: '/catalog', element: <Catalog/>},
    {path: '/wishlist', element: <WishList/>},
    {path: '/cart', element: <Cart/>},
    {path: '/about', element: <AboutUs/>},
    {path: '/catalog/:id', element: <ProductPage/>},
    {path: '/profile', element: <Profile/>}
]

export const publicRoutes = [
    {path: '/auth/login', element: <Login/>},
    {path: '/auth/register', element: <Register/>}
]