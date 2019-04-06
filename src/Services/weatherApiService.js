export default class WeatherApiService {
  static apiKey = '4acd346b6549dd2dbc0dc6b9a716c63d'
  static url = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5'

  static getCurrentLocation() {
    return new Promise(async (resolve, reject) => {
      let response = await fetch('https://cors-anywhere.herokuapp.com/http://ip-api.com/json', {
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response) {
        if (response.status !== 200) {
          reject()
        }

        resolve(response.json())
      } else {
        throw new Error('Failed to retrieve weather api')
      }
    })
  }

  static fetchWeather(city, country, type = 'forecast') {
    if (!city) {
      throw new Error('at least city is needed')
    }

    return new Promise(async (resolve, reject) => {
      let params = country ? `${city},${country}` : city
      let response = await fetch(
        `${WeatherApiService.url}/${type}?q=${params}&units=metric&APPID=${WeatherApiService.apiKey}`,
        {
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )

      if (response && response.ok) {
        if (response.status !== 200) {
          reject(response)
        }

        resolve(response.json())
      } else {
        reject(response)
      }
    })
  }
}
