import React from 'react';
import cl from './OrderSuccesModal.module.css'
import MyButton from "../buttons/commonButton/MyButton";

const OrderSuccessModal = ({children, visible, setVisible, clearCart}) => {
    const rootClasses = [cl.myModal]

    if (visible)
        rootClasses.push(cl.active)

    function close() {
        setVisible(false);
        clearCart();
    }

    return (
        <div className={rootClasses.join(' ')} onClick={close}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <MyButton onClick={close}>OK</MyButton>
            </div>
        </div>
    );
};

export default OrderSuccessModal;