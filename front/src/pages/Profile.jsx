import React, {useContext} from 'react';
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import ContentFrame from "../components/UI/contentFrame/ContentFrame";
import MyButton from "../components/UI/buttons/commonButton/MyButton";
import AuthService from "../service/AuthService";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";

const Profile = () => {
    const router = useNavigate()
    const {setIsAuth} = useContext(AuthContext);

    const logout = () => {
        AuthService.logout();
        setIsAuth(false);
        router("/auth/login");
    }
    return (
        <ContentDiv>
            <h1>Профиль</h1>
            <ContentFrame>
                <MyButton onClick={logout}>Выйти из аккаунта</MyButton>
            </ContentFrame>
        </ContentDiv>
    );
};

export default Profile;