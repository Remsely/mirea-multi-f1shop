import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from "./NavBar.module.css";
import LocalStorage from "../../../util/localStorage";
import {subscribeToEvent} from "../../../util/events";

const NavBar = () => {
    const router = useNavigate()
    const [cartItemCount, setCartItemCount] = useState(LocalStorage.getCartIDs().length);
    const [wishlistItemsCount, setWishlistItemsCount] = useState(LocalStorage.getWishlistIDs().length);
    const [navBarItems, setNavBarItems] = useState([]);

    useEffect(() => {
        const handleCartChange = () => {
            setCartItemCount(LocalStorage.getCartIDs().length);
        };

        const handleWishlistChange = () => {
            setWishlistItemsCount(LocalStorage.getWishlistIDs().length);
        };

        subscribeToEvent('cartChanged', handleCartChange);
        subscribeToEvent('wishlistChanged', handleWishlistChange);

        setNavBarItems([
            {link: "/catalog", title: "Каталог", count: 0},
            {link: "/wishlist", title: "Избранное", count: wishlistItemsCount},
            {link: "/cart", title: "Корзина", count: cartItemCount},
            {link: "/about", title: "О нас", count: 0},
        ])
    }, [cartItemCount, wishlistItemsCount]);

    return (
        <section className={classes.topNav}>
            <div className={classes.logoDiv} onClick={() => router(`/catalog`)}>
                <img className={classes.logoImg} src={"/F1Shop/logo.svg"} alt="Логотип магазина"/>
                <div className={classes.shopName}>Мир Формулы 1</div>
            </div>

            <input className={classes.menuToggle} id="menu-toggle-id" type="checkbox"/>
            <label className={classes.menuButtonContainer} htmlFor="menu-toggle-id">
                <div className={classes.menuButton}></div>
            </label>
            <ul className={classes.menu}>
                {navBarItems.map(item =>
                    <li key={item.link} className={classes.menuLi}>
                        <Link className={classes.links} to={item.link}>
                            {item.title}
                        </Link>
                        {item.count !== 0 &&
                            <div className={classes.itemsCounter}>
                                <div>
                                    {item.count}
                                </div>
                            </div>
                        }
                    </li>
                )}
            </ul>
        </section>
    );
};

export default NavBar;