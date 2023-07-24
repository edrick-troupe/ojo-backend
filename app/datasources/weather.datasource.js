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
        days: 7,
      },
    });

    return weather.forecast.forecastday.map((forecastday) => ({
      day: forecastday.date_epoch,
      precipitation: forecastday.day.totalprecip_mm,
      temperature: forecastday.day.avgtemp_c,
      sky: forecastday.day.condition.text,
    }));
  }
}

export default Weather;
