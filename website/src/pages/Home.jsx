// Import the React library to enable JSX syntax and use React features
import React from "react";

/**
 * Import CSS module for styling specific to this component.
 * This method scopes class names locally by default, avoiding
 * class name conflicts.
 */
import styles from "./Home.module.css";
import PageTitle from "../components/PageTitle";

// Define the Home component as a functional component
const Home = () => {
    // Return statement contains the JSX layout for the component
    return (
        /**
         * In React, a component is a logical element of HTML you want to display.
         * A return statement can only return one parent element, meaning you cannot
         * have two elements at the top of the return statement. React provides a
         * <Fragment/> element if it doesn't make sense to return a normal HTML
         * element.
         */
        <div className={`${styles.heroImage} d-flex align-items-center justify-content-center`}>
            <PageTitle title="Home" />

            <h1 className={`${styles.shadow} ${styles.title} text-white display-1 text-center`}>Cards Against Humanity</h1>
        </div>
    );
};

/* Export the Home component to be used in other parts of the application */
export default Home;
