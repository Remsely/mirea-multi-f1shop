import Catalog from "../pages/Catalog";
import WishList from "../pages/WishList";
import Cart from "../pages/Cart";
import AboutUs from "../pages/AboutUs";
import ProductPage from "../pages/ProductPage";


export const privateRoutes = [
    {path: '/catalog', element: <Catalog/>},
    {path: '/wishlist', element: <WishList/>},
    {path: '/cart', element: <Cart/>},
    {path: '/about', element: <AboutUs/>},
    {path: '/catalog/:id', element: <ProductPage/>},
]