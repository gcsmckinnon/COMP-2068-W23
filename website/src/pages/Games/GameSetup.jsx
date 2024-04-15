import React, { useState, useEffect } from "react";
import { useGame } from "./Index";

import { useAuth } from "../../App";

const GameSetup = () => {
    const { gameState, setGameState } = useGame();
    const [gameCode, setGameCode] = useState("");
    const { user } = useAuth();

    const hostRequest = () => {
        console.log("REQUESTING HOST");
        gameState.socket.emit("hostRequest", user);
    };

    const joinRequest = () => gameState.socket.emit("joinRequest", user, gameCode);

    return (
        <div className="gameSetup">
            <div className="gameSetupActions">
                <div className="row my-3">
                    <div className="col">
                        {/* Make the button full-width and apply additional styling */}
                        <button className="btn btn-danger w-100 py-3" onClick={hostRequest}>
                            Host Game
                        </button>
                    </div>
                </div>

                <div className="display-1 text-center">
                    <p>OR</p>
                </div>

                <div className="row my-3">
                    <div className="col">
                        <div className="input-group">
                            <span className="input-group-text">Join Game</span>

                            <input type="text" className="form-control" placeholder="Enter game code" onChange={(e) => setGameCode(e.target.value)} />

                            <button className="btn btn-primary" type="button" onClick={joinRequest}>
                                GO
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameSetup;
