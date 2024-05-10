import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from "./NavBar.module.css";
import {CartContext, WishlistContext} from "../../../context";

const NavBar = () => {
    const router = useNavigate()
    const [navBarItems, setNavBarItems] = useState([]);

    const {wishlistSize} = useContext(WishlistContext);
    const {cartSize} = useContext(CartContext);

    useEffect(() => {
        setNavBarItems([
            {link: "/catalog", title: "Каталог", count: 0},
            {link: "/wishlist", title: "Избранное", count: wishlistSize},
            {link: "/cart", title: "Корзина", count: cartSize},
            {link: "/about", title: "О нас", count: 0},
            {link: "/profile", title: "Профиль", count: 0}
        ])
    }, [cartSize, wishlistSize]);

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
                        {item.count !== 0 && item.count &&
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