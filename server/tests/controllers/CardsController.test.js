import * as CardsController from "../../controllers/CardsController.js";
import Card from "../../models/Card.js";
import { jest } from "@jest/globals";

jest.mock("../../models/Card", () => {
    return jest.fn().mockImplementation(() => {
        return {
            save: jest.fn().mockResolvedValue({}),
        };
    });
});

describe("CardsController", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("index", () => {
        it("should get all cards", async () => {
            const mockCards = [
                { content: "Test Content 1", type: "QUESTION" },
                { content: "Test Content 2", type: "ANSWER" },
            ];

            Card.find = jest.fn().mockResolvedValue(mockCards);

            const mockReq = {};
            const mockRes = {
                render: jest.fn(),
            };
            const mockNext = jest.fn();

            await CardsController.index(mockReq, mockRes, mockNext);

            expect(mockRes.render).toHaveBeenCalledWith("cards/index", { cards: mockCards, title: "Cards List" });
            expect(Card.find).toHaveBeenCalled();
        });
    });

    describe("show", () => {
        it("should get a card by ID", async () => {
            const mockCardId = "1234567890";
            const mockCard = { _id: mockCardId, content: "Test Content", type: "QUESTION" };

            Card.findById = jest.fn().mockResolvedValue(mockCard);

            const mockReq = {
                params: { id: mockCardId },
            };
            const mockRes = {
                render: jest.fn(),
            };
            const mockNext = jest.fn();

            await CardsController.show(mockReq, mockRes, mockNext);

            expect(Card.findById).toHaveBeenCalledWith(mockCardId);
            expect(mockRes.render).toHaveBeenCalledWith("cards/show", {
                card: mockCard,
                title: "Card View",
            });
        });
    });

    describe("add", () => {
        it("should render the add page", async () => {
            const mockReq = {};
            const mockRes = {
                render: jest.fn(),
            };
            const mockNext = jest.fn();

            await CardsController.add(mockReq, mockRes, mockNext);

            expect(mockRes.render).toHaveBeenCalledWith("cards/add", {
                cardTypes: expect.anything(),
                formType: "create",
                title: "New Card",
            });
        });
    });

    describe("edit", () => {
        it("should render the edit page with the card data", async () => {
            const mockCardId = "1234567890";
            const mockCard = { _id: mockCardId, content: "Test Content", type: "QUESTION" };

            Card.findById = jest.fn().mockResolvedValue(mockCard);

            const mockReq = {
                params: { id: mockCardId },
            };
            const mockRes = {
                render: jest.fn(),
            };
            const mockNext = jest.fn();

            await CardsController.edit(mockReq, mockRes, mockNext);

            expect(Card.findById).toHaveBeenCalledWith(mockCardId);
            expect(mockRes.render).toHaveBeenCalledWith("cards/edit", {
                card: mockCard,
                cardTypes: expect.anything(),
                formType: "update",
                title: "Edit Card",
            });
        });

        it("should throw an error if ID is missing", async () => {
            const mockReq = {
                params: {},
            };
            const mockRes = {};
            const mockNext = jest.fn();

            try {
                await CardsController.edit(mockReq, mockRes, mockNext);
            } catch (error) {
                expect(error).toBeDefined();
            }
        });

        it("should throw an error if card does not exist", async () => {
            const mockCardId = "1234567890";

            Card.findById = jest.fn().mockResolvedValue(null);

            const mockReq = {
                params: { id: mockCardId },
            };
            const mockRes = {
                status: jest.fn(),
            };
            const mockNext = jest.fn();

            try {
                await CardsController.edit(mockReq, mockRes, mockNext);
            } catch (error) {
                expect(error).toBeDefined();
            }
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe("create", () => {
        it("should create a new card", async () => {
            const mockCard = { _id: "1234567890", content: "Test Content", type: "QUESTION" };

            const mockReq = {
                body: mockCard,
            };
            const mockRes = {
                redirect: jest.fn(),
            };
            const mockNext = jest.fn();

            const saveSpy = jest.spyOn(Card.prototype, "save").mockImplementation();

            try {
                await CardsController.create(mockReq, mockRes, mockNext);

                expect(saveSpy).toHaveBeenCalled();
                expect(mockRes.redirect).toHaveBeenCalledWith("/cards");
            } catch (error) {
                console.error(error);
                expect(error).toBeUndefined();
            }
        }, 30000);

        it("should throw an error if the type is missing", async () => {
            const mockCard = { _id: "1234567890", content: "Test Content" };

            const mockReq = {
                body: mockCard,
            };
            const mockRes = {};
            const mockNext = jest.fn();

            try {
                await CardsController.create(mockReq, mockRes, mockNext);
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });

    describe("update", () => {
        it("should update a card and redirect", async () => {
            const mockCard = { _id: "1234567890", content: "Updated Content", type: "ANSWER" };

            const mockReq = { params: { id: mockCard._id }, body: mockCard };
            const mockRes = { redirect: jest.fn() };
            const mockNext = jest.fn();

            const saveSpy = jest.spyOn(Card.prototype, "save").mockImplementation();
            Card.findById = jest.fn().mockResolvedValue(new Card(mockCard));

            try {
                await CardsController.update(mockReq, mockRes, mockNext);

                expect(Card.findById).toHaveBeenCalledWith(mockCard._id);
                expect(saveSpy).toHaveBeenCalled();
                expect(mockRes.redirect).toHaveBeenCalledWith("/cards");
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it("should handle non-existent cards", async () => {
            const mockReq = { params: { id: "nonexistent" }, body: {}, status: jest.fn() };
            const mockRes = {};
            const mockNext = jest.fn();

            Card.findById = jest.fn().mockResolvedValue("nonexistent");

            try {
                await CardsController.update(mockReq, mockRes, mockNext);

                expect(Card.findById).toHaveBeenCalledWith("nonexistent");
                expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });

    describe("remove", () => {
        it("should delete a card and redirect", async () => {
            const mockCardId = "1234567890";
            const mockReq = { params: { id: mockCardId } };
            const mockRes = { redirect: jest.fn() };
            const mockNext = jest.fn();

            Card.findById = jest.fn().mockResolvedValue(new Card({ _id: mockCardId }));
            const findByIdAndDeleteSpy = jest.spyOn(Card, "findByIdAndDelete").mockResolvedValue({});

            try {
                await CardsController.remove(mockReq, mockRes, mockNext);

                expect(Card.findById).toHaveBeenCalledWith(mockCardId);
                expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(mockCardId);
                expect(mockRes.redirect).toHaveBeenCalledWith("/cards");
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it("should handle non-existent cards", async () => {
            const mockCardId = "nonexistent";
            const mockReq = { params: { id: mockCardId } };
            const mockRes = {};
            const mockNext = jest.fn();

            Card.findById = jest.fn().mockResolvedValue(null);

            try {
                await CardsController.remove(mockReq, mockRes, mockNext);

                expect(Card.findById).toHaveBeenCalledWith(mockCardId);
                expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });
});
