import { useEffect, useState } from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { FetchHttpClient } from '../services/FetchHttpClient'
import { WeatherDataHandler } from '../services/WeatherDataHandler'
import Helpers from '../services/Helpers'

export default function useDayOffAndWeatherCombination({ startDate, endDate }, location) {
  // eslint-disable-next-line no-unused-vars
  const [combinedData, setCombinedData] = useState({})

  useEffect(() => {
    const makeChecks = async () => {
      const checkDays = async () => {
        if (typeof startDate !== 'undefined' && endDate !== 'undefined') {
          const startDateFormatted = moment(startDate).format('YYYYMMDD')
          const endDateFormatted = moment(endDate).format('YYYYMMDD')
          const url = `https://isdayoff.ru/api/getdata?date1=${startDateFormatted}&date2=${endDateFormatted}`
          return FetchHttpClient.get(url)
        }

        throw new Error('One of the dates is empty')
      }

      const defineForecast = async () => {
        const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions()
        const params = {
          latitude: Math.round((location.latitude + Number.EPSILON) * 100) / 100,
          longitude: Math.round((location.longitude + Number.EPSILON) * 100) / 100,
          timezone,
          daily: 'weathercode',
          past_days: 2,
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

      if (Helpers.isDefined(startDate) && Helpers.isDefined(endDate)) {
        const rawDaysData = await checkDays()
        const textDaysData = await rawDaysData.text()
        // handle results and assign to each date from range
        const datesFromRange = Helpers.getDatesFromRange({ startDate, endDate })
        const dayOffDataTmp = {}
        datesFromRange.forEach((date, index) => {
          dayOffDataTmp[date] = parseInt(textDaysData[index], 10) !== 0
        })

        const forecastData = await defineForecast()
        const dailyForecast = forecastData.forecast
        const finalDayOffForecastData = []
        // eslint-disable-next-line no-restricted-syntax
        for (const [dateOff, isDateDayOff] of Object.entries(dayOffDataTmp)) {
          const dForecast = dailyForecast.find((dF) => dF.date === dateOff)
          finalDayOffForecastData.push({
            date: dateOff,
            uuid: uuidv4(),
            isDayOff: isDateDayOff,
            forecast: {
              exist: dForecast !== undefined,
              data: dForecast,
            },
          })
        }

        setCombinedData(finalDayOffForecastData)
      }
    }
    makeChecks()
  }, [endDate, location.latitude, location.longitude, location.message, startDate])

  return combinedData
}
