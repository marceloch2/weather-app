export default function createStateConfig() {
  return {
    isLoading: false,
    metric: "&#8451;",
    wind_speed: "km",
    humidity: "%",
    tab: "weather",
    globalError: {
      hasError: false,
      msg: ""
    },
    user: {
      username: "",
      hash: ""
    },
    location: {
      city: "",
      country: ""
    },
    weatherData_weather: [],
    weatherData_forecast: [],
    geo: {
      lat: 10,
      lng: 10
    }
  };
}
