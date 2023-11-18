import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
