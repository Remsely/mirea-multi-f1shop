import React from 'react';
import classes from "./ModalContent.module.css";

const ModalContent = (props) => {
    return (
        <div className={classes.container}>
            <h1>Заказ успешно оформлен!</h1>
            <p className={classes.p}>
                Наш менеджер скоро свяжется с вами по номеру {props.tel} для уточнения деталей заказа.
            </p>
            <div className={classes.specContainer}>
                <h2>Данные заказа:</h2>
                <div className={classes.spec}>Получатель: {props.fullName}</div>
                <div className={classes.spec}>Телефон: {props.tel}</div>
                <div className={classes.spec}>Электронная почта: {props.email}</div>
                <div className={classes.spec}>Адрес доставки: {props.address}</div>
                <div className={classes.spec}>Домофон: {props.intercom}</div>
                {props.comment !== '' && <div className={classes.spec}>Комментарий курьеру: {props.comment}</div>}
                <div className={classes.spec}>Оплата: наличными или картой при получении</div>
            </div>
        </div>
    );
};

export default ModalContent;