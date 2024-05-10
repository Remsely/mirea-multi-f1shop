import './styles/App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";
import Footer from "./components/UI/footer/Footer";
import {AuthContext} from "./context";
import {useState} from "react";
import AuthService from "./service/AuthService";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
    const [isAuth, setIsAuth] = useState(() => {
        const token = AuthService.getToken();
        return token !== null && token !== undefined
    });

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <div className="App">
                <NavBar/>
                <AppRouter/>
                <Footer/>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
