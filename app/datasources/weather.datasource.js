import { RESTDataSource } from '@apollo/datasource-rest';

class Weather extends RESTDataSource {
  baseURL = process.env.WEATHER_API_ENDPOINT;

  async getForecast(lat, lng) {
    const weather = await this.get('forecast.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: `${lat},${lng}`,
        aqi: 'no',
        alerts: 'no',
        days: 1,
      },
    });

    return weather.forecast.forecastday.map((forecastday) => ({
      day: forecastday.date,
      temperature: forecastday.day.avgtemp_c,
      sky: forecastday.day.condition.text,
      icon: forecastday.day.condition.icon,
    }));
  }
}

export default Weather;
