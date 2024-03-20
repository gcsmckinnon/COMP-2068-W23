import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useAuth } from "../App";

const Navigation = () => {
    const { user } = useAuth();

    const pageLinks = [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" },
        { label: "Contact", link: "/contact" },
        { label: "Cards", link: "/cards" },
        // Conditionally render these based on user's login status
        ...(user
            ? [
                  { label: "Profile", link: `/profile` },
                  { label: "Logout", link: "/logout" },
              ]
            : [
                  { label: "Register", link: "/register" },
                  { label: "Login", link: "/login" },
              ]),
    ];

    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand text-white ${styles.brand}`} to="/">
                    MyApp
                </Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {pageLinks.map(({ label, link }, index) => (
                        <li className="nav-item" key={index}>
                            <Link className={`nav-link ${styles.navLink}`} to={link}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
