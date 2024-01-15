import { jest } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

global.fetch = jest.fn();

describe("PagesController", () => {
    describe("GET /", () => {
        it("should respond with the home view", async () => {
            const response = await request(app).get("/");

            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /insult", () => {
        it("should respond with a specific insult", async () => {
            const mockedInsult = "Your mother smells of daisy farts!";
            
            global.fetch.mockResolvedValueOnce({
                text: () => Promise.resolve(mockedInsult),
            });

            const response = await request(app).get("/insult");

            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain(mockedInsult);

            global.fetch.mockRestore();
        });

        it('should handle errors', async () => {
            const mockError = new Error('Failed to fetch insult');
            global.fetch.mockRejectedValueOnce(mockError);

            const response = await request(app).get('/insult');

            expect(response.statusCode).not.toBe(200);

            global.fetch.mockRestore();
        });
    });
});
