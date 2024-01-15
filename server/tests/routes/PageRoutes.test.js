/**
 * Supertest is used to simulate making HTTP requests to
 * an Express application
 */
import request from "supertest";
import app from "../../app.js";

describe("PageRoutes", () => {
    /**
     * This will describe our test, so we can easily determine
     * which test is failing when it happens
     */
    describe("PageRoutes", () => {
        /**
         * We can nest descriptions to make test organization
         * much clearer
         */
        describe("GET /", () => {
            /**
             * This is a test. It describes what the test is attempting
             * to determine. If it fails, we should see a message like:
             * "PageRoutes"
             *   "GET /"
             *     "should respond with a 200"
             *       "Expected response.statusCode to equal 200"
             *         "Received 404 instead"
             */
            it("should respond with a 200", async () => {
                const response = await request(app).get("/");
    
                expect(response.statusCode).toBe(200);
            });
        });
    
        describe("GET /insult", () => {
            it("should respond with a 200", async () => {
                const response = await request(app).get("/insult");
    
                expect(response.statusCode).toBe(200);
            });
        }); 
    });
});
