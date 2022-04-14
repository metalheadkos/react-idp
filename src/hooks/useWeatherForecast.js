import { useEffect, useState } from 'react'
import { FetchHttpClient } from '../services/FetchHttpClient'
import { WeatherDataHandler } from '../services/WeatherDataHandler'

export default function useWeatherForecast(location, dates) {
  const [forecast, setForecast] = useState({})

  useEffect(() => {
    const defineForecast = async () => {
      const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions()
      const params = {
        latitude: Math.round((location.latitude + Number.EPSILON) * 100) / 100,
        longitude: Math.round((location.longitude + Number.EPSILON) * 100) / 100,
        timezone,
        daily: 'weathercode',
      }
      // eslint-disable-next-line no-debugger
      // debugger
      if (!Number.isNaN(params.latitude) && !Number.isNaN(params.longitude)) {
        const response = await FetchHttpClient.get('https://api.open-meteo.com/v1/forecast', params)
        const data = await response.json()

        return {
          forecast: WeatherDataHandler.handle(data.daily),
          isLocationDefined: true,
          result: true,
        }
      }

      return ({
        result: false,
        forecast: [],
        isLocationDefined: false,
        reason: {
          type: 'location',
          description: { message: location.message },
        },
      })
    }

    defineForecast().then((r) => setForecast(r))
  }, [dates, location.latitude, location.longitude, location.message])

  return forecast
}
