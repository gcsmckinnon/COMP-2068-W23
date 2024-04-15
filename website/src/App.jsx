import React, { Suspense, lazy, useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Lazy load the components
import HomePage from "./pages/Home";
import Cookies from "js-cookie";
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const RegisterPage = lazy(() => import("./pages/Users/Register"));
const LoginPage = lazy(() => import("./pages/Users/Login"));
const ProfilePage = lazy(() => import("./pages/Users/Profile"));
const LogoutPage = lazy(() => import("./pages/Users/Logout"));
const GamesPage = lazy(() => import("./pages/Games/Index"));

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let user = Cookies.get("user");

        if (!user) return

        user = JSON.parse(user);
        const fetchData = async () => {
            try {
                const userResp = await axios.get(`/api/users/${user.id}`);

                setUser(userResp.data);
            } catch (error) {
                console.log("ERROR LOGGING IN USER AUTOMATICALLY", error);
                Cookies.remove("user");
                setUser(null);
                return;
            }
        }

        fetchData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                <ToastContainer />
                <Navigation />
                <Suspense fallback={<div>Loading...</div>}>
                    {" "}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/games" element={<GamesPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
