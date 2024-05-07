import './styles/App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";
import Footer from "./components/UI/footer/Footer";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <AppRouter/>
            <Footer/>
        </div>
    );
}

export default App;
