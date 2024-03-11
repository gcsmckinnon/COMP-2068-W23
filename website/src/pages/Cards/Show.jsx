import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import styles from "./Cards.module.css";

const Show = () => {
    const { id } = useParams();
    const [card, setCard] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const cardResp = await axios.get(`/api/cards/${id}`);
            
            setCard(cardResp.data);
        };

        fetchData();
    }, [id]);

    return (
        <div className="container">
            <PageTitle title="Card" />

            <h1>Card</h1>

            <hr className="my-3" />

            <div className="d-flex flex-wrap justify-content-center">
                <div>
                    <div className={`${styles.card} ${card.type === "QUESTION" ? styles.black : styles.white}`}>
                        <div className="card-body">
                            <h5 className="card-title">{card.content}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;