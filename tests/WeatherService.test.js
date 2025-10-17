import WeatherService from "../services/WeatherService.js";

describe("WeatherService", () => {
    const apiKey = "test_key";
    const service = new WeatherService(apiKey);

    it("должен формировать правильный URL для города", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({ temp: 25 }) })
        );
        const data = await service.getWeatherByCity("Moscow");
        expect(data.temp).toBe(25);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("q=Moscow"));
    });
});
