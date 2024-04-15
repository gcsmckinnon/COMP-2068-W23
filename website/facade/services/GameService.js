import Redis from "ioredis";
import CardService from "./CardService.js";
import crypto from "crypto";

const GameService = (async () => {
    const redis = new Redis();
    const cardService = await CardService;

    const hostGame = async (user) => {
        const gameId = generateGameId();
        const deck = await cardService.index();
        const questions = deck.filter((card) => card.type === "QUESTION");
        const answers = deck.filter((card) => card.type === "ANSWER");

        const game = {
            gameId,
            host: user,
            players: [],
            status: "waiting",
            deck: { questions: shuffle(questions), answers: shuffle(answers) },
            answerDiscard: [],
            questionDiscard: [],
        };

        const key = `game:${gameId}`;
        await redis.set(key, JSON.stringify(game), "EX", 3600);

        return gameId;
    };

    const joinGame = async (user, gameId) => {
        const key = `game:${gameId}`;
        const gameData = await redis.get(key);

        if (!gameData) {
            throw new Error("Game not found");
        }

        const game = JSON.parse(gameData);

        if (game.deck.answers.length < 5) {
            const answers = shuffle(game.answerDiscard);
            game.deck.answers.push(...answers);
        }

        game.players.push({ user, answers: game.deck.answers.splice(0, 5), score: 0 });

        await redis.set(key, JSON.stringify(game), "EX", 3600);

        return gameId;
    }

    const getGame = async (gameId) => {
        const key = `game:${gameId}`;
        const gameData = await redis.get(key);

        if (!gameData) {
            throw new Error("Game not found");
        }

        return JSON.parse(gameData);
    };

    const exitGame = async (user, gameId) => {
        const key = `game:${gameId}`;
        const gameData = await redis.get(key);

        if (!gameData) {
            throw new Error("Game not found");
        }

        const game = JSON.parse(gameData);

        game.players = game.players.filter((player) => player.user.id !== user.id);

        await redis.set(key, JSON.stringify(game), "EX", 3600);

        return gameId;
    };

    const endGame = async (user, gameId) => {
        const key = `game:${gameId}`;
        const gameData = await redis.get(key);

        if (!gameData) {
            throw new Error("Game not found");
        }

        const game = JSON.parse(gameData);

        if (game.host._id !== user.id) {
            await redis.del(key);
        } else throw new Error("Only the host can end the game");

        return gameId;
    };

    const startRound = async (user, gameId) => {
        const key = `game:${gameId}`;
        const gameData = await redis.get(key);

        if (!gameData) {
            throw new Error("Game not found");
        }

        const game = JSON.parse(gameData);

        if (game.host._id !== user._id) {
            throw new Error("Only the host can start a round");
        }

        game.status = "playing";

        game.players.forEach((player) => {
            // Check if player has less than 5 answers and if they do, refill their hand
            if (player.answers.length < 5) {
                if (game.deck.answers.length < 5) {
                    const answers = shuffle(game.answerDiscard);
                    game.deck.answers.push(...answers);
                }

                player.answers.push(...answers.splice(0, 5 - player.answers.length));
            }
        });

        game.currentQuestion = game.deck.questions.pop();

        await redis.set(key, JSON.stringify(game), "EX", 3600);

        return gameId;
    };

    return {
        hostGame,
        joinGame,
        getGame,
        exitGame,
        endGame,
        startRound,
    };
})();

export default GameService;

function generateGameId () {
    return crypto.randomBytes(3).toString('hex');
};

function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};
