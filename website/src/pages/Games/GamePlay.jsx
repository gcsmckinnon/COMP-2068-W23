import React, { useEffect, useState } from "react";
import { useGame } from "./Index";
import PlayerList from "./PlayerList";
import { useAuth } from "../../App";

const GamePlay = () => {
    const { gameState } = useGame();
    const { user } = useAuth();
    const [selectedAnswers, setSelectedAnswers] = useState([null]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const availableBlanks = useState((currentQuestion.match(/\[blank\]/g) || []).length);

    useEffect(() => {
        if (gameState.game.currentQuestion) {
            setCurrentQuestion(gameState.game.currentQuestion.question.replace(/\[blank\]/g, "_____"));
        }
    }, [gameState.game.currentQuestion]);

    const exitGame = () => gameState.socket.emit("exitGameRequest", user, gameState.game.gameId);

    const endGame = () => {
        console.log("ENDING GAME");
        gameState.socket.emit("endGameRequest", user, gameState.game.gameId);
        console.log(gameState.socket);
    }

    const startRound = () => {
        console.log("STARTING ROUND");
        gameState.socket.emit("startRoundRequest", user, gameState.game.gameId);
    };

    const selectAndReplace = (event) => {
        if (selectedAnswers.length >= availableBlanks) {
            selectedAnswers.shift();
        };

        selectedAnswers.shift(event.target.textContent);

        setSelectedAnswers([...selectedAnswers]);
        setCurrentQuestion((selectedAnswers.reduce((question, answer) => question.replace(/\[blank\]/, answer), currentQuestion)).replace(/\[blank\]/g, "_____"));
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col pe-4 border-end">
                            <div className="display-1 text-center">
                                <h2>HOST: {gameState.game.host.nickname}</h2>
                                <p>GAME ID: {gameState.game.gameId}</p>
                            </div>
                        </div>

                        <div className="col">
                            <PlayerList />
                        </div>
                    </div>

                    <div className="row game-actions">
                        {gameState.game.host._id === user._id ? (
                            <div className="col">
                                {!gameState.game.currentQuestion && (
                                    <button className="btn btn-primary" onClick={startRound}>
                                        Start Round
                                    </button>
                                )}

                                <button className="btn btn-danger" onClick={endGame}>
                                    End Game
                                </button>

                            </div>
                        ) : (
                            <button className="btn btn-danger" onClick={exitGame}>
                                Exit Game
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {gameState.game.currentQuestion && (
                <>
                    <hr className="my-3" />

                    <div className="row">
                        <div className="col">
                            <h1>Cards Against Humanity</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h3>Question</h3>
                            <p className="question text-center display-3">{currentQuestion}</p>
                        </div>
                    </div>

                    <hr className="my-3" />

                    {gameState.game.host._id !== user._id && (
                        <div className="row">
                            <div className="col">
                                <h3>Answers</h3>

                                <div className="row">
                                    {gameState.game.player && gameState.game.player.answers.length > 0 && gameState.game.player.answers.map((answer) => (
                                        <div key={answer._id} className="answer col-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <p className="card-text" onClick={selectAndReplace}>{answer.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default GamePlay;
