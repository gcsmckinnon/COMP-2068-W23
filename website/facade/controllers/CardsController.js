import CardService from "../services/CardService.js";

export const index = async (_, res, __) => {
    try {
        const cardService = await CardService;
        const cards = await cardService.index();

        res.json(cards);
    } catch (error) {
        console.error(error);

        res.json([]);
    }
}

export const show = async (req, res, _) => {
    try {
        const cardService = await CardService;
        const card = await cardService.show(req.params.id);

        res.json(card);
    } catch (error) {
        console.error(error);

        res.json({});
    }
}