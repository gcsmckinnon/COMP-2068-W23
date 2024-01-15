/**
 * Because we're going to mock a function, which requires us
 * to use the Jest API, we must import it
 */
import { jest } from "@jest/globals";
import request from "supertest";
import app from "../../app.js";

/**
 * This is a mock. The way it works is when "fetch" is called,
 * it will instead act the way you see below. It will just call
 * this empty function, and short circuit the call
 */
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
            /**
             * Here we're mocking our fetch function's response, so we
             * can preset the required response. This is the preferred strategy
             * versus integrated testing. Integrated testing would test the
             * actual response from the API. It is better to assume the API
             * has already been tested by the developer, so there should be no
             * reason to test it again. Instead, we create a simulated response
             * based on their documentation, and we write our test around that
             */
            const mockedInsult = "Your mother smells of daisy farts!";
            
            global.fetch.mockResolvedValueOnce({
                text: () => Promise.resolve(mockedInsult),
            });

            const response = await request(app).get("/insult");

            /**
             * These are our expectations. We expect the status code to be successful.
             * We expect the response to be in a text/html format.
             * We expect the response text content to match our mocked insult
             */
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html");
            expect(response.text).toContain(mockedInsult);

            /**
             * This resets the mock, so we can use the function as it's implemented
             * in the future
             */
            global.fetch.mockRestore();
        });

        /**
         * It's a good idea to test not only successful scenarios, but also
         * to test what occurs when something fails. TDD (Test Driven Development)
         * should test all probable scenarios
         */
        it('should handle errors', async () => {
            const mockError = new Error('Failed to fetch insult');
            global.fetch.mockRejectedValueOnce(mockError);

            const response = await request(app).get('/insult');

            expect(response.statusCode).not.toBe(200);

            global.fetch.mockRestore();
        });
    });
});
