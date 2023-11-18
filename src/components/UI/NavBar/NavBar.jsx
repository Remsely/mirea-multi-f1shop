import React from 'react';
import {Link} from "react-router-dom";
import classes from "./NavBar.module.css";
import {navBarItems} from "./navbarItems";

const NavBar = () => {
    return (
        <section className={classes.topNav}>
            <div className={classes.logoDiv}>
                <img className={classes.logoImg} src="/logo.svg" alt="Логотип магазина"/>
                <div className={classes.shopName}>Мир Формулы-1</div>
            </div>

            <input className={classes.menuToggle} id="menu-toggle-id" type="checkbox"/>
            <label className={classes.menuButtonContainer} htmlFor="menu-toggle-id">
                <div className={classes.menuButton}></div>
            </label>
            <ul className={classes.menu}>
                {navBarItems.map(item =>
                    <li className={classes.menuLi}>
                        <Link className={classes.links} to={item.link} key={item.link}>
                            {item.title}
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default NavBar;