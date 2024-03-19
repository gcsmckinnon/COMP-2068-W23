import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContext, useContext } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Lazy load the components
import HomePage from "./pages/Home";
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const CardsPage = lazy(() => import("./pages/Cards/Index"));
const CardPage = lazy(() => import("./pages/Cards/Show"));
const RegisterPage = lazy(() => import("./pages/Users/Register"));
const LoginPage = lazy(() => import("./pages/Users/Login"));
const ProfilePage = lazy(() => import("./pages/Users/Profile"));

const App = () => {
    const [user, setUser] = useState(null);
    const login = user => setUser(user);

    return (
        <AuthContext.Provider value={{ user, login }}>
            <Router>
                <ToastContainer />
                <Navigation />
                <Suspense fallback={<div>Loading...</div>}>
                    {" "}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage  />} />
                        <Route path="/contact" element={<ContactPage  />} />
                        <Route path="/cards" element={<CardsPage  />} />
                        <Route path="/cards/:id" element={<CardPage  />} />
                        <Route path="/users/:id" element={<ProfilePage  />} />
                        <Route path="/users/register" element={<RegisterPage  />} />
                        <Route path="/users/login" element={<LoginPage  />} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
