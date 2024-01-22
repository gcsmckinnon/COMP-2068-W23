import Card from "../../models/Card.js";

describe("Card", () => {
    it("should be invalid if content is empty", async () => {
        const card = new Card({ type: "QUESTION" });

        let err;

        try {
            await card.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.content).toBeDefined();
    });

    it("should be invalid if type is empty", async () => {
        const card = new Card({ content: "Test Content" });

        let err;

        try {
            await card.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.type).toBeDefined();
    });

    it("should be invalid if content is less than 3 characters", async () => {
        const card = new Card({ content: "Te", type: "QUESTION" });

        let err;

        try {
            await card.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.content).toBeDefined();
    });

    it("should be invalid if content is more than 300 characters", async () => {
        let content = "a".repeat(301);
        const card = new Card({ content: content, type: "QUESTION" });

        let err;

        try {
            await card.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.content).toBeDefined();
    });

    it("should be valid with valid content and type", async () => {
        const card = new Card({ content: "Test Content", type: "QUESTION" });

        let err;

        try {
            await card.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeFalsy();
    });
});
