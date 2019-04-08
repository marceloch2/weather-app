import WeatherApiService from "@/Services/WeatherApiService";

describe("WeatherApiService", () => {
  beforeEach(() => {});

  it("Initial Class properties are not null", () => {
    expect(WeatherApiService.apiKey).not.toBeNull();
    expect(WeatherApiService.url).not.toBeNull();
  });

  it("Can fetchWeather method throw correct Errors", () => {
    expect(() => {
      WeatherApiService.fetchWeather();
    }).toThrow();

    expect(() => {
      WeatherApiService.fetchWeather();
    }).toThrow(new Error("at least city is needed"));
  });
});
