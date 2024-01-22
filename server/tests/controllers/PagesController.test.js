import { jest } from "@jest/globals";
import { home } from "../../controllers/PagesController";

describe("PagesController", () => {
    describe("home", () => {
        it("should respond with the home view", async () => {
            const mockReq = {};
            const mockRes = {
                render: jest.fn(),
            };

            home(mockReq, mockRes);

            expect(mockRes.render).toHaveBeenCalled();
        });
    });
});
