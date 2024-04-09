import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "../../App";
import Cookies from "js-cookie";

const socket = io("http://localhost:3000");

const Index = () => {
    const { user } = useAuth();
    const [game, setGame] = useState({});
    const [showButtons, setShowButtons] = useState(true);
    const [joinGameCode, setJoinGameCode] = useState("");
    const [host, setHost] = useState(false);

    useEffect(() => {
        const gameCheckResp = localStorage.getItem("game");

        if (gameCheckResp) {
            const gameCheck = JSON.parse(gameCheckResp);
            if (gameCheck.game) {
                setGame(gameCheck.game);
                setShowButtons(false);
            }

            if (gameCheck.playerType === "host") {
                setHost(true);
            }
        }

        socket.on("connection", () => {
            console.log("Connected to WebSocket server");
        });

        socket.on("hostGame", (game) => {
            console.log("Game hosted with ID", game.gameId);

            setGame(game);
            setHost(true);
            
            localStorage.setItem("game", JSON.stringify({ playerType: "host", game }));

            setShowButtons(false);
        });

        socket.on("joinGame", (game) => {
            console.log("Game joined with ID", game.gameId);

            setGame(game);

            localStorage.setItem("game", JSON.stringify({ playerType: "player", game }));


            setShowButtons(false);
        });

        return () => {
            socket.off("connection");
            socket.off("hostGame");
            socket.off("joinGame");
        };
    }, []);

    const hostGame = () => {
        socket.emit("hostGame", user);
    };

    const joinGame = () => {
        socket.emit("joinGame", user, joinGameCode);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            {showButtons ? (
                <>
                    <div className="mb-3">
                        <button className="btn btn-lg btn-primary me-2" onClick={() => hostGame()}>
                            Host Game
                        </button>
                    </div>

                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter Game Code" onChange={(e) => setJoinGameCode(e.target.value)} />

                        <button className="btn btn-outline-secondary" type="button" onClick={() => joinGame()}>
                            Join
                        </button>
                    </div>
                </>
            ) : game ? (
                <>
                    <div className="text-center mt-4">
                        <h3>
                            Game Code: <span className="text-primary">{game.gameId || joinGameCode}</span>
                        </h3>
                    </div>
                    <div className="mt-4">
                        {host ? <span>You are the host!</span> : <span>You are a player!</span>}
                        <p>Gameboard will appear here...</p>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Index;
