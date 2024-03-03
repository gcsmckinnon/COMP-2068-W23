import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand text-white ${styles.brand}`} to="/">
                    MyApp
                </Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${styles.navLink}`} to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${styles.navLink}`} to="/about">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${styles.navLink}`} to="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
