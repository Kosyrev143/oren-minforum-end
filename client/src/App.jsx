import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Modal from "./components/modal/Modal";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import AdminPanel from "./pages/Admin/AdminPanel.jsx";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const handleUserRegistrationChange = useCallback((newValue) => {
        setIsUserRegistered(newValue);
    }, []);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserRegistered) {
            navigate("/");
        }
    }, [isUserRegistered, navigate]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/registration"
                    element={
                        <Register
                            onUserRegistrationChange={handleUserRegistrationChange}
                        />
                    }
                />
                <Route
                    path="/e3afed0047b08059d0fada10f400c1e5"
                    element={<AdminPanel />}
                />
                {/* <Route path="/Booking" element={<Booking />} />
        <Route path="/CreateRooms" element={<CreateRooms />} />
        <Route path="/DeleteImage" element={<DeleteImage />} />  */}
            </Routes>
            <ToastContainer position="bottom-left" autoClose={10000} />
            <Footer />
        </>
    );
}

export default App;
