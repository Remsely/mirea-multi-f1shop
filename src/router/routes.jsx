import Catalog from "../pages/Catalog/Catalog";
import WishList from "../pages/Wishlist/WishList";
import Cart from "../pages/Cart/Cart";
import AboutUs from "../pages/AboutUs/AboutUs";
import ProductPage from "../pages/ProduсtPage/ProductPage";


export const privateRoutes = [
    {path: '/catalog', element: <Catalog/>},
    {path: '/wishlist', element: <WishList/>},
    {path: '/cart', element: <Cart/>},
    {path: '/about', element: <AboutUs/>},
    {path: '/catalog/:id', element: <ProductPage/>},
]