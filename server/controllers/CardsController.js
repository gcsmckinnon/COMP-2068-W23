import Card from "../models/Card.js";

const cardTypes = Card.schema.path("type").enumValues;

export const index = async (req, res, next) => {
    try {
        const cards = await Card.find().populate("author");

        res.format({
            "text/html": () => {
                res.render("cards/index", { cards, title: "Cards List" });
            },
            "application/json": () => {
                res.json({ cards });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.id).populate("author");

        res.format({
            "text/html": () => {
                res.render("cards/show", { card, title: "Card View" });
            },
            "application/json": () => {
                res.json({ card });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
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

        const newCard = new Card({ content, type, author: req?.user?.id});

        await newCard.save();

        res.format({
            "text/html": () => {
                req.session.notifications = [{ alertType: "alert-success", message: "Card was created successfully" }];
                res.redirect("/cards");
            },
            "application/json": () => {
                res.status(201).json({ status: 201, message: "SUCCESS" });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Card failed to create" }];
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { content, type } = req.body;

        const card = await Card.findById(req.params.id);

        if (!card) {
            req.status = 404;
            throw new Error("Card does not exist");
        }

        card.content = content;
        card.type = type;
        card.author = req?.user?.id;

        await card.save();

        res.format({
            "text/html": () => {
                req.session.notifications = [{ alertType: "alert-success", message: "Card was updated successfully" }];
                res.redirect("/cards");
            },
            "application/json": () => {
                res.status(200).json({ status: 200, message: "SUCCESS" });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Card failed to update" }];
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

        res.format({
            "text/html": () => {
                req.session.notifications = [{ alertType: "alert-success", message: "Card was deleted successfully" }];
                res.redirect("/cards");
            },
            "application/json": () => {
                res.status(200).json({ status: 200, message: "SUCCESS" });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Card failed to delete" }];
        next(error);
    }
};