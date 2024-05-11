import React, {useContext, useState} from 'react';
import classes from "./CartItem.module.css";
import CartButton from "../buttons/cartButtons/CartButton";
import {useNavigate} from "react-router-dom";
import CartService from "../../../service/CartService";
import {CartContext} from "../../../context";
import {useFetching} from "../../../hooks/useFetching";
import {CircularProgress} from "@mui/material";

const CartItem = ({item, remove, updateCart}) => {
    const [itemInstance, setItemInstance] = useState(item);
    const router = useNavigate();
    const {cartSize, setCartSize} = useContext(CartContext);

    const [plusItem, isItemPlusLoading] = useFetching(async () => {
        let cartItemInstance = await CartService.addToCartInCart(itemInstance.id, itemInstance.amount + 1);
        setItemInstance(cartItemInstance);
        updateCart(cartItemInstance);
    })

    const [minusItem, isItemMinusLoading] = useFetching(async () => {
        let cartItemInstance = await CartService.addToCartInCart(itemInstance.id, itemInstance.amount - 1);
        setItemInstance(cartItemInstance);
        updateCart(cartItemInstance);
    })

    const [deleteItem, isItemDeletionLoading] = useFetching(async () => {
        await CartService.removeFromCart(itemInstance.id,);
        remove(itemInstance);
        setCartSize(cartSize - 1);
    })

    function minusCount(e) {
        e.stopPropagation();
        minusItem();
    }

    function plusCount(e) {
        e.stopPropagation();
        plusItem();
    }

    function removeItem(e) {
        e.stopPropagation();
        deleteItem();
    }

    return (
        <div className={classes.container} onClick={() => router(`/catalog/${itemInstance.id}`)}>
            <img className={classes.img}
                 src={itemInstance.image}
                 alt={itemInstance.name}
            />
            <div className={classes.specifiesContainer}>
                <div className={classes.nameAndDelContainer}>
                    <div className={classes.name}>{itemInstance.name}</div>
                    {isItemDeletionLoading
                        ? <CircularProgress style={{color: 'black'}} size={30}/>
                        : <CartButton
                            style={{border: "none"}}
                            icon={"/icons/close.svg"}
                            onClick={removeItem}
                        />
                    }
                </div>
                <div className={classes.priceAndCountContainer}>
                    <div className={classes.price}>{(itemInstance.price * itemInstance.amount) + "₽"}</div>
                    <div className={classes.countContainer}>
                        {isItemMinusLoading
                            ? <CircularProgress style={{color: 'black'}} size={3}/>
                            :
                            itemInstance.amount > 1 &&
                            <CartButton
                                icon={"/icons/minus.svg"}
                                onClick={minusCount}
                            />
                        }
                        <div className={classes.count}>{itemInstance.amount}</div>
                        {isItemPlusLoading
                            ? <CircularProgress style={{color: 'black'}} size={27}/>
                            : <CartButton icon={"/icons/plus.svg"} onClick={plusCount}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;