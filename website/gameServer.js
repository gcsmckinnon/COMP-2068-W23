import GameService from "./facade/services/GameService.js";

export default async function (io) {
    const gameService = await GameService;

    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });

        socket.on("hostGame", async (user) => {
            const resp = await gameService.create(user);
            
            if (!resp) {
                console.error("Error creating game");
                return null;
            }

            console.log(resp);
            const game = await gameService.get(resp);
            return socket.emit("hostGame", game);
        });

        socket.on("joinGame", async (user, gameId) => {
            const resp = await gameService.join(user, gameId);

            if (!resp) {
                console.error("Error joining game");
                return null;
            }

            console.log(resp);
            const game = await gameService.get(resp);
            return socket.emit("joinGame", game);
        });
    });
}
