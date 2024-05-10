import React, {useContext, useState} from 'react';
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/buttons/commonButton/MyButton";
import {AuthContext} from "../context";
import AuthService from "../service/AuthService";
import ContentFrame from "../components/UI/contentFrame/ContentFrame";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const {setIsAuth} = useContext(AuthContext);
    const router = useNavigate()

    const register = async (e) => {
        e.preventDefault();
        if (userPassword !== userPasswordConfirm) {
            alert("Введенные пароли не совпадают!");
            setUserPasswordConfirm('');
            return;
        }
        try {
            const response = await AuthService.register(userEmail, userPassword);
            if (response.status === 200) {
                setIsAuth(true);
                router(`/catalog`)
            } else {
                setIsAuth(false);
                alert("Такой пользователь уже зарегестрирован!")
            }
        } catch (error) {
            console.error(error);
            alert("Ошибка регистрации!")
        }
    }

    return (
        <ContentDiv>
            <h1>Регистрация</h1>
            <ContentFrame>
                <form onSubmit={register}>
                    <MyInput
                        type="email"
                        placeholder={"email@example.com"}
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        style={{marginBottom: 10}}
                    />
                    <MyInput
                        type="password"
                        placeholder={"Пароль"}
                        value={userPassword}
                        onChange={e => setUserPassword(e.target.value)}
                        style={{marginBottom: 10}}
                    />
                    <MyInput
                        type="password"
                        placeholder={"Подтверждение пароля"}
                        value={userPasswordConfirm}
                        onChange={e => setUserPasswordConfirm(e.target.value)}
                        style={{marginBottom: 10}}
                    />
                    <MyButton type={"submit"}>Зарегестрироваться</MyButton>
                </form>
            </ContentFrame>
        </ContentDiv>
    );
};

export default Register;