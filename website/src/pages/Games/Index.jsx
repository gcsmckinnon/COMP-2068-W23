import React, { useState, useEffect, createContext, useContext } from "react";
import io from "socket.io-client";
import { useAuth } from "../../App";
import { toast } from "react-toastify";

import GameSetup from "./GameSetup";
import GamePlay from "./GamePlay";
import GameEnd from "./GameEnd";

const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);
const socket = io("http://localhost:3000");

const Index = () => {
    const { user } = useAuth();
    const [gameState, setGameState] = useState({});
    const [socketReady, setSocketReady] = useState(false);

    const gameReady = (game, playerType) => {
        setGameState((prevState) => ({ ...prevState, game, playerType, status: "ready" }));

        localStorage.setItem("gameId", game.gameId);

        toast.success("Game is ready to play!");
    };

    const gameUpdated = (game) => {
        console.log("Game updated", game, user);

        if (game.players.length > 0 && game.host && user && game.host._id !== user._id) {
            const player = game.players.find((player) => player.user._id === user._id);

            console.log(game.players, user);

            if (!player) throw new Error("Player not found in game");

            game.player = player;
        }

        setGameState((prevState) => ({ ...prevState, status: "ready", game }));
    };

    const gameExited = () => {
        console.log("Client exited game");
        localStorage.removeItem("gameId");

        // Temporarily set a state to indicate processing of exit
        setGameState((prevState) => ({ ...prevState, exitingGame: true }));

        // Then after a delay or in a callback, set the state that might unmount the component
        setTimeout(() => {
            setGameState((prevState) => ({ ...prevState, status: "waiting", game: null, exitingGame: false }));
        }, 1000); // Delaying to ensure the socket event can be processed
    };

    const errorHandler = (error) => {
        toast.error(error);
    };

    const messageHandler = (message) => toast.info(message);

    useEffect(() => {
        if (!user) {
            toast.error("You must be logged in to play a game");
            return;
        };

        const connected = () => {
            console.log("CONNECTED", user);

            setGameState((prevState) => ({
                ...prevState,
                user,
                selectedQuestion: null,
                selectedAnswers: [],
                socket,
                game: null,
                status: "waiting",
                socket,
            }));

            setSocketReady(true);
        };

        socket.on("connect", connected);
        socket.on("gameStarted", gameReady);
        socket.on("gameUpdated", gameUpdated);
        socket.on("gameExited", gameExited);
        socket.on("error", errorHandler);
        socket.on("message", messageHandler);

        return () => {
            socket.off("connect", connected);
            socket.off("gameStarted", gameReady);
            socket.off("gameExited", gameExited);
            socket.off("gameUpdated", gameUpdated);
            socket.off("error", errorHandler);
            socket.off("message", messageHandler);
        };
    }, []);

    return (
        socketReady && (
            <GameContext.Provider value={{ gameState, setGameState }}>
                <div className="container d-flex flex-xl-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                    {gameState.status === "waiting" && <GameSetup />}

                    {gameState.status === "ready" && <GamePlay />}

                    {gameState.status === "closed" && <GameEnd />}
                </div>
            </GameContext.Provider>
        )
    );
};

export default Index;
