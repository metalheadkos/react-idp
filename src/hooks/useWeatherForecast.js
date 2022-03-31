import { FetchHttpClient } from '../services/FetchHttpClient'

// eslint-disable-next-line no-unused-vars
export default function useWeatherForecast(params = {}) {
  // request weather forecast
  return FetchHttpClient.get('https://api.open-meteo.com/v1/forecast', params)
    .then((r) => Promise.resolve(r.json()))
    .catch((e) => Promise.reject(e))
}
