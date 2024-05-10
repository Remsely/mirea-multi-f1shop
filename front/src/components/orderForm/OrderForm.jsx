import React, {useState} from 'react';
import FormInput from "../UI/form/formInput/FormInput";
import FormComment from "../UI/form/formComment/FormComment";
import MyButton from "../UI/buttons/commonButton/MyButton";
import classes from "./OrderForm.module.css";
import OrderSuccessModal from "../UI/modal/OrderSuccessModal";
import {useFetching} from "../../hooks/useFetching";
import ModalContent from "../modalContent/ModalContent";
import {CircularProgress} from "@mui/material";
import * as PurchaseService from "../../service/PurchaseService";

const OrderForm = ({clearCart}) => {
    const [modal, setModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [intercom, setIntercom] = useState('');
    const [comment, setComment] = useState('');

    const [addOrder, isOrderAdditionLoading, error] = useFetching(async () => {
        let order = {
            date: new Date(),
            recipientsFullName: fullName,
            recipientsPhoneNumber: tel,
            recipientsEmail: email,
            address: address,
            intercom: intercom,
            comments: comment
        }
        await PurchaseService.createOrder(order);
    })

    function order(e) {
        e.preventDefault();
        addOrder(order);
        setModal(true);
    }

    return (
        <form className={classes.form} onSubmit={order}>
            <OrderSuccessModal
                visible={modal}
                setVisible={setModal}
                clearCart={clearCart}
            > {isOrderAdditionLoading
                ? <CircularProgress style={{color: 'white'}} size={100}/>
                : error
                    ? <h2>Ошибка при создании заказа: {error}</h2>
                    : <ModalContent
                        fullName={fullName}
                        tel={tel}
                        email={email}
                        address={address}
                        intercom={intercom}
                        comment={comment}
                    />
            }
            </OrderSuccessModal>
            <FormInput
                id={"fullName"}
                value={fullName}
                type={"text"}
                title={"Имя получателя (обязательно)"}
                placeHolder={"Иванов Иван Иванович"}
                onChange={e => setFullName(e.target.value)}
            />
            <FormInput
                id={"tel"}
                value={tel}
                type={"tel"}
                title={"Телефон получателя (обязательно)"}
                placeHolder={"+7(777)777-77-77"}
                onChange={e => setTel(e.target.value)}
            />
            <FormInput
                id={"email"}
                value={email}
                type={"email"}
                title={"Электронная почта (обязательно)"}
                placeHolder={"vasyapupkin@email.dom"}
                onChange={e => setEmail(e.target.value)}
            />
            <FormInput
                id={"address"}
                value={address}
                type={"text"}
                title={"Адрес доставки (обязательно)"}
                placeHolder={"г. Москва, ул. Пушкина, д. 15, этаж 15, кв. 15"}
                onChange={e => setAddress(e.target.value)}
            />
            <FormInput
                id={"intercom"}
                value={intercom}
                type={"text"}
                title={"Домофон (обязательно)"}
                placeHolder={"123"}
                onChange={e => setIntercom(e.target.value)}
            />
            <FormComment
                id={"comment"}
                value={comment}
                text={"Комментарий курьеру"}
                onChange={e => setComment(e.target.value)}
            />
            <MyButton type={"submit"}>Оформить заказ</MyButton>
        </form>
    )
        ;
};

export default OrderForm;