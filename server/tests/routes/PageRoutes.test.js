import request from "supertest";
import app from "../../app.js";

describe("PageRoutes", () => {
    let server;

    beforeEach(() => {
        server = app.listen()
    });

    afterEach(async () => {
        await server.close();
    });

    describe("GET /", () => {
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
