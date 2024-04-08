import Redis from "ioredis";
import CardService from "./CardService.js";

const GameService = (async () => {
    const redis = new Redis();

    return {
        create: async (user) => {
            try {
                // generates a random 6 digit hexadecimal number
                const gameId = Math.floor(Math.random() * 1000000).toString(16);

                const cardService = await CardService;
                const deck = await cardService.index();
                const questions = deck.filter(card => card.type === "QUESTION");
                const answers = deck.filter(card => card.type === "ANSWER");

                const key = `game:${gameId}`;
                const packet = {
                    gameId,
                    host: user,
                    players: [],
                    status: "waiting",
                    deck: { questions, answers },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                await redis.set(key, JSON.stringify(packet));

                return gameId;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        join: async (user, gameId) => {
            try {
                const gameData = await redis.get(`game:${gameId}`);

                if (!gameData) {
                    throw new Error("Game not found");
                }

                const game = JSON.parse(gameData);

                if (game.status === "started") {
                    throw new Error("Game already started");
                }

                // pop off 5 answers from the answer deck and add to the user
                const answers = game.deck.answers.splice(0, 5);
                game.players.push({ user, answers, score: 0 });

                return gameId;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        get: async (gameId) => {
            try {
                const gameData = await redis.get(`game:${gameId}`);

                if (!gameData) {
                    throw new Error("Game not found");
                }

                return JSON.parse(gameData);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        start: async (gameId) => {
            try {
                const gameData = await redis.get(`game:${gameId}`);

                if (!gameData) {
                    throw new Error("Game not found");
                }

                const game = JSON.parse(gameData);

                if (game.status === "started") {
                    throw new Error("Game already started");
                }

                game.status = "started";
                game.updatedAt = new Date();

                await redis.set(`game:${gameId}`, JSON.stringify(game));
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        end: async (gameId) => {
            try {
                const gameData = await redis.get(`game:${gameId}`);

                if (!gameData) {
                    throw new Error("Game not found");
                }

                const game = JSON.parse(gameData);

                if (game.status === "ended") {
                    throw new Error("Game already ended");
                }

                game.status = "ended";
                game.updatedAt = new Date();

                await redis.set(`game:${gameId}`, JSON.stringify(game));
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        delete: async (gameId) => {
            try {
                await redis.del(`game:${gameId}`);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    };
})();

export default GameService;