import { useEffect, useState } from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { FetchHttpClient } from '../services/FetchHttpClient'
import { WeatherDataHandler } from '../services/WeatherDataHandler'
import Helpers from '../services/Helpers'

export default function useDayOffAndWeatherCombination({ startDate, endDate, points = [] }, location) {
  // eslint-disable-next-line no-unused-vars
  const [combinedData, setCombinedData] = useState({})

  useEffect(() => {
    const makeChecks = async () => {
      const checkDays = async (sDate, eDate) => {
        if (typeof sDate !== 'undefined' && eDate !== 'undefined') {
          const startDateFormatted = moment(sDate).format('YYYYMMDD')
          const endDateFormatted = moment(eDate).format('YYYYMMDD')
          const url = `https://isdayoff.ru/api/getdata?date1=${startDateFormatted}&date2=${endDateFormatted}`
          return FetchHttpClient.get(url)
        }

        throw new Error('One of the dates is empty')
      }

      /**
       * @param {Array} tmpData
       * @returns {Object}
       */
      const defineForecast = async (tmpData) => {
        const fData = []
        const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions()
        // eslint-disable-next-line no-restricted-syntax
        for (const { date, point } of tmpData) {
          const params = {
            latitude: Math.round((point[1] + Number.EPSILON) * 100) / 100,
            longitude: Math.round((point[0] + Number.EPSILON) * 100) / 100,
            timezone,
            daily: 'weathercode',
            past_days: 2,
          }

          if (!Number.isNaN(params.latitude) && !Number.isNaN(params.longitude)) {
            // todo: rework
            // eslint-disable-next-line no-await-in-loop
            const response = await FetchHttpClient.get('https://api.open-meteo.com/v1/forecast', params)
            // eslint-disable-next-line no-await-in-loop
            const data = await response.json()

            fData.push({
              date,
              forecast: WeatherDataHandler.handle(data.daily),
              isLocationDefined: true,
              result: true,
            })
          } else {
            fData.push({
              result: false,
              forecast: [],
              isLocationDefined: false,
              reason: {
                type: 'location',
                description: { message: location.message },
              },
            })
          }
        }

        return fData
      }

      if (Helpers.isDefined(startDate) && Helpers.isDefined(endDate)) {
        const datesFromRangeToHandle = Helpers.getDatesFromRange({ startDate, endDate })
          .filter((date, index) => index < points.length)
        const rawDaysData = await checkDays(
          datesFromRangeToHandle[0],
          datesFromRangeToHandle[datesFromRangeToHandle.length - 1],
        )
        const textDaysData = await rawDaysData.text()
        const dayOffDataTmp = []
        datesFromRangeToHandle.forEach((date, index) => {
          dayOffDataTmp.push({
            date,
            isDayOff: parseInt(textDaysData[index], 10) !== 0,
            point: points[index],
          })
        })

        const dailyForecast = await defineForecast(dayOffDataTmp)
        const finalDayOffForecastData = []

        dayOffDataTmp.forEach(({ date, isDayOff }) => {
          // get from general data by date
          const dForecast = dailyForecast.find((dF) => dF.date === date)
          // get from forecast for point by date
          const dForecastData = dForecast.forecast.find((fd) => fd.date === date)
          finalDayOffForecastData.push({
            date,
            uuid: uuidv4(),
            isDayOff,
            forecast: {
              exist: dForecastData !== undefined,
              data: dForecastData,
            },
          })
        })

        setCombinedData(finalDayOffForecastData)
      }
    }
    makeChecks()
  }, [endDate, location.latitude, location.longitude, location.message, points, points.length, startDate])

  return combinedData
}
