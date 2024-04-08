import React, {useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "../../App";

// Assuming your server is running on port 3001
const socket = io("http://localhost:3000");

const Index = () => {
    const { user } = useAuth();
    const [game, setGame] = useState({});

    useEffect(() => {
        socket.on("connection", () => {
            console.log("Connected to WebSocket server");
        });

        socket.on("hostGame", (game) => {
            console.log("Game hosted with ID", game.gameId);
            setGame(game);
        });

        socket.on("joinGame", (game) => {
            console.log("Game joined with ID", game.gameId);
            setGame(game);
        });

        return () => {
            socket.off("connection");
            socket.off("hostGame");
        };
    }, []);

    // Example function to play a card
    const hostGame = () => {
        socket.emit("hostGame", user);
    };

    const joinGame = () => {
        socket.emit("joinGame", user, game.gameId);
    };

    return (
        <div>
            {/* Your game UI here */}
            <button onClick={() => hostGame()}>Host Game</button>
            <button onClick={() => joinGame()}>Join Game</button>
        </div>
    );
};

export default Index;
