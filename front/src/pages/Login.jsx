import React, {useContext, useState} from 'react';
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import ContentFrame from "../components/UI/contentFrame/ContentFrame";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/buttons/commonButton/MyButton";
import {AuthContext} from "../context";
import AuthService from "../service/AuthService";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const {setIsAuth} = useContext(AuthContext);
    const router = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        try {
            const response = await AuthService.login(userEmail, userPassword);
            console.log(response);
            console.log(response.status);
            if (response.status === 200) {
                if (response.data.accessToken === null) {
                    setIsAuth(false);
                    alert("Авторизация провалена!")
                } else {
                    setIsAuth(true);
                }
                router(`/catalog`)
            } else {
                alert("Авторизация провалена!")
            }
        } catch (error) {
            alert("Авторизация провалена!")
            console.error(error);
        }
    }

    return (
        <ContentDiv>
            <h1>Авторизация</h1>
            <ContentFrame>
                <form onSubmit={login}>
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
                    <MyButton type={"submit"}>Войти</MyButton>
                    <MyButton onClick={() => router(`/auth/register`)}>Перейти к регестрации</MyButton>
                </form>
            </ContentFrame>
        </ContentDiv>
    );
};

export default Login;