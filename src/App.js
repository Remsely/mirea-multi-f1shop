import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";
import Footer from "./components/UI/footer/Footer";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
