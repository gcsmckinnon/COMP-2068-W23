import GameService from "./facade/services/GameService.js";

export default async function (io) {
    const { hostGame, joinGame, getGame, exitGame, endGame, startRound, } = await GameService;

    io.on("error", (error) => {
        console.log("IO ERROR:", error);
        console.error(`Socket error: ${error.message}`);
    });

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("error", (error) => {
            console.log("SOCKET ERROR:", error);
            console.error(`Socket error: ${error.message}`);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
            console.error("You have been disconnected from the server");
        });

        socket.on("hostRequest", async (user) => {
            try {
                console.log("REQUESTING HOST");

                const gameId = await hostGame(user);
                const game = await getGame(gameId);

                socket.join(gameId);

                console.log("EMITTING GAME STARTED");
                socket.emit("gameStarted", game);
            } catch (error) {
                console.error(error);
                socket.emit("error", `Failed to create game: ${error.message}`);
            }
        });

        socket.on("joinRequest", async (user, gameId) => {
            try {
                await joinGame(user, gameId);
                const game = await getGame(gameId);

                socket.join(gameId);

                io.in(gameId).emit("gameUpdated", game);

                socket.emit("gameJoined", game);

                console.log(user);
                io.in(gameId).emit("message", `${user.nickname} has joined the game`);
            } catch (error) {
                console.error(error);
                socket.emit("error", `Failed to join game: ${error.message}`);
            }
        });

        socket.on("exitGameRequest", async (user, gameId) => {
            try {
                socket.emit("gameExited");

                console.log("Client exited game");

                await exitGame(user, gameId);

                io.in(gameId).emit("message", `${user.nickname} has left the game`);

                socket.leave(gameId);

                const game = await getGame(gameId);
                io.in(gameId).emit("gameUpdated", game);
            } catch (error) {
                console.error(error);
                socket.emit("error", `Failed to exit game: ${error.message}`);
            }
        });

        socket.on("endGameRequest", async (user, gameId) => {
            try {
                console.log("ENDING GAME", gameId);
                await endGame(user, gameId);

                
                io.in(gameId).emit("message", `Host ${user.nickname} has ended the game`);
                
                io.in(gameId).emit("gameExited");
                
                console.log("Host ended game");
                
                const clients = await io.in(gameId).allSockets();
                for (const clientId of clients) {
                    io.sockets.sockets.get(clientId).leave(gameId);
                }
            } catch (error) {
                console.error(error);
                socket.emit("error", `Failed to end game: ${error.message}`);
            }
        });

        socket.on("startRoundRequest", async (user, gameId) => {
            try {
                console.log("STARTING ROUND", gameId);
                
                await startRound(user, gameId);

                const game = await getGame(gameId);

                io.in(gameId).emit("gameUpdated", game);
                io.in(gameId).emit("message", `Host ${user.nickname} has started the round`);
            } catch (error) {
                console.error(error);
                socket.emit("error", `Failed to start round: ${error.message}`);
            }
        });
    });
}
