import Catalog from "../pages/Catalog";
import WishList from "../pages/WishList";
import Basket from "../pages/Basket";
import AboutUs from "../pages/AboutUs";
import ProductPage from "../pages/ProductPage";

export const privateRoutes = [
    {path: '/catalog', element: <Catalog/>},
    {path: '/wishlist', element: <WishList/>},
    {path: '/basket', element: <Basket/>},
    {path: '/about', element: <AboutUs/>},
    {path: '/catalog/:id', element: <ProductPage/>},
]