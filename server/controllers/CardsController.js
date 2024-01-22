import Card from "../models/Card.js";

const cardTypes = Card.schema.path("type").enumValues;

export const index = async (req, res, next) => {
    try {
        const cards = await Card.find();

        res.render("cards/index", { cards, title: "Cards List" });
    } catch(error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.id);

        if (!card) {
            req.status = 404;
            throw new Error("Card does not exist");
        }

        res.render("cards/show", { card, title: "Card View" });
    } catch(error) {
        next(error);
    }
};

export const add = async (req, res, next) => {
    try {
        res.render("cards/add", { cardTypes, formType: "create", title: "New Card" });
    } catch(error) {
        next(error);
    }
};

export const edit = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) throw new Error("Missing required ID");

        const card = await Card.findById(req.params.id);

        if (!card) {
            req.status = 404;
            throw new Error("Card does not exist");
        }

        res.render("cards/edit", { card, cardTypes, formType: "update", title: "Edit Card" });
    } catch(error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { content, type } = req.body;

        const newCard = new Card({ content, type});

        await newCard.save();

        res.redirect("/cards");
    } catch(error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { content, type } = req.body;

        const card = await Card.findById(req.params.id);
        console.log(card);

        if (!card) {
            req.status = 404;
            throw new Error("Card does not exist");
        }

        card.content = content;
        card.type = type;

        await card.save();

        res.redirect("/cards");
    } catch(error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.id);

        if (!card) {
            req.status = 404;
            throw new Error("Card does not exist");
        }

        await Card.findByIdAndDelete(req.params.id);

        res.redirect("/cards");
    } catch(error) {
        next(error);
    }
};