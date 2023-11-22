import React, {useState} from 'react';
import FormInput from "../UI/form/formInput/FormInput";
import FormComment from "../UI/form/formComment/FormComment";
import MyButton from "../UI/buttons/commonButton/MyButton";
import classes from "./OrderForm.module.css";
import OrderSuccessModal from "../UI/modal/OrderSuccessModal";
import ModalContent from "../modalContent/ModalContent";

const OrderForm = ({clearCart}) => {
    const [modal, setModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [intercom, setIntercom] = useState('');
    const [comment, setComment] = useState('');

    function order(e) {
        e.preventDefault();
        setModal(true);
    }

    return (
        <form className={classes.form} onSubmit={order}>
            <OrderSuccessModal
                visible={modal}
                setVisible={setModal}
                clearCart={clearCart}
            >
                <ModalContent
                    fullName={fullName}
                    tel={tel}
                    email={email}
                    address={address}
                    intercom={intercom}
                    comment={comment}
                />
            </OrderSuccessModal>
            <FormInput
                id={"fullName"}
                value={fullName}
                type={"text"}
                title={"ФИО (обязательно)"}
                placeHolder={"Иванов Иван Иванович"}
                onChange={e => setFullName(e.target.value)}
            />
            <FormInput
                id={"tel"}
                value={tel}
                type={"tel"}
                title={"Телефон получателя (обязательно)"}
                placeHolder={"+7XXXXXXXXXX"}
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
    );
};

export default OrderForm;