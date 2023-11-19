import Catalog from "../pages/Catalog/Catalog";
import WishList from "../pages/Wishlist/WishList";
import Basket from "../pages/Basket/Basket";
import AboutUs from "../pages/AboutUs/AboutUs";
import ProductPage from "../pages/ProdustPage/ProductPage";


export const privateRoutes = [
    {path: '/catalog', element: <Catalog/>},
    {path: '/wishlist', element: <WishList/>},
    {path: '/basket', element: <Basket/>},
    {path: '/about', element: <AboutUs/>},
    {path: '/catalog/:id', element: <ProductPage/>},
]