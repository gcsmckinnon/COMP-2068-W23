import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

// Lazy load the components
import HomePage from "./pages/Home";
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const CardsPage = lazy(() => import("./pages/Cards/Index"));
const CardPage = lazy(() => import("./pages/Cards/Show"));

const App = () => {
    return (
        <Router>
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                {" "}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage  />} />
                    <Route path="/contact" element={<ContactPage  />} />
                    <Route path="/cards" element={<CardsPage  />} />
                    <Route path="/cards/:id" element={<CardPage  />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
