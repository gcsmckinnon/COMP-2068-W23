import React from "react";
import styles from "./Cards.module.css";

const Card = ({ card, children }) => {
    return (
        <div key={card._id} className={`${styles.card} ${card.type === "QUESTION" ? styles.black : ""}`}>
            <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>
                    { card.content.replace(/\[blank\]/g, '_____') }
                </h5>
            </div>

            { children }
        </div>
    );
};

export default Card;