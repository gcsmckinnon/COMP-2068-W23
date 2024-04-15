import React from "react";
import { useGame } from "./Index";
import { useAuth } from "../../App";

const PlayerList = () => {
    const { gameState } = useGame();
    const { user } = useAuth();

    return (
        gameState.game &&
        gameState.game.players && (
            <div className="playerList">
                <h2>Players</h2>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Player</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gameState.game.players.map((player) => (
                            <tr key={player?.user._id}>
                                <td>
                                    {player?.user._id === user._id ? (
                                        <strong>{player?.user.nickname}</strong>
                                    ) : (
                                        player?.user.nickname
                                    )}
                                </td>
                                <td>{player?.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );
};

export default PlayerList;
