import React, { useEffect, useState } from "react";
import styles from "./Cards.module.css";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "./Card";

const Cards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const cardResp = await axios.get("/api/cards");

            setCards(cardResp.data);
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <PageTitle title="Cards" />
            <h1>Cards</h1>
            <hr className="my-3" />

            <div className="d-flex flex-wrap justify-content-center">
                {cards.length > 0 &&
                    cards.map((card) => (
                        <Card card={card}>
                            <div className={styles.cardFooter}>
                                <Link to={`/cards/${card._id}`} className={`btn btn-primary ${styles.viewButton}`}>
                                    View
                                </Link>
                            </div>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default Cards;
