import React from 'react';
import classes from "./Footer.module.css";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className={classes.marginDiv}>
            <footer className={classes.footer}>
                <div className={classes.container}>
                    <div className={classes.row}>
                        <div className={classes.footerCol}>
                            <h4>Навигация</h4>
                            <ul>
                                <li><Link to={"/catalog"}>Каталог</Link></li>
                                <li><Link to={"/wishlist"}>Избранное</Link></li>
                                <li><Link to={"/cart"}>Корзина</Link></li>
                            </ul>
                        </div>
                        <div className={classes.footerCol}>
                            <h4>Компания</h4>
                            <ul>
                                <li><a href={"/F1Shop/about"} target="_blank" rel="noreferrer">О Нас</a></li>
                                <li><a href={"https://merchf1.ru/"} target="_blank" rel="noreferrer">F1Merch</a></li>
                                <li><a href={"https://fueler.store/collections/f1-2023-collection"} target="_blank"
                                       rel="noreferrer">Fueler Store</a></li>
                                <li><a href={"https://ru.wikipedia.org/wiki/Формула-1"} target="_blank"
                                       rel="noreferrer">О Формуле-1</a></li>
                            </ul>
                        </div>
                        <div className={classes.footerCol}>
                            <h4>Наши контакты</h4>
                            <ul>
                                <li><a href={"mailto:prokopchukromain@mail.ru"} target="_blank" rel="noreferrer">Служба
                                    поддержки</a></li>
                                <li><a href={"tel:+79151981661"} target="_blank" rel="noreferrer">Телефон</a></li>
                                <li><a href={"mailto:prokopchukromain@mail.ru"} target="_blank" rel="noreferrer">Электронная
                                    почта</a></li>
                                <li>
                                    <a
                                        href={"https://yandex.ru/maps/org/rtu_mirea/1084832794/?ll=37.480409%2C55.669986&z=16.57"}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Адрес
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={classes.footerCol}>
                            <h4>Наши соцсети</h4>
                            <div className={classes.socialLinks}>
                                <a href="https://t.me/Remsely " target="_blank" rel="noreferrer">
                                    <img
                                        className={classes.icon}
                                        src={"/icons/telegram.svg"}
                                        alt={"icon"}
                                    />
                                </a>
                                <a href="https://vk.com/remsely" target="_blank" rel="noreferrer">
                                    <img
                                        className={classes.icon}
                                        src={"/icons/VK.svg"}
                                        alt={"icon"}
                                    />
                                </a>
                                <a href="https://www.youtube.com/channel/UCxmm0-xJ0l02DDXi2t0RODw" target="_blank"
                                   rel="noreferrer">
                                    <img
                                        className={classes.icon}
                                        src={"/icons/youtube.svg"}
                                        alt={"icon"}
                                    />
                                </a>
                                <a href="https://github.com/Remsely/F1Shop" target="_blank" rel="noreferrer">
                                    <img
                                        className={classes.icon}
                                        src={"/icons/github.svg"}
                                        alt={"icon"}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;