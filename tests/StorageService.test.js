import StorageService from "../services/StorageService.js";

describe("StorageService", () => {
    it("сохраняет и получает данные", () => {
        const service = new StorageService();
        service.setItem("key", { a: 1 });
        expect(service.getItem("key")).toEqual({ a: 1 });
    });
});
