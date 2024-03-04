import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

// Lazy load the components
import HomePage from "./pages/Home";
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));

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
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
