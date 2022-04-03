import React, { useEffect, useState } from 'react'
import { Alert, Box } from '@mui/material'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import useGeolocation from '../hooks/useGeolocation'
import useWeatherForecast from '../hooks/useWeatherForecast'
import { WeatherDataHandler } from '../services/WeatherDataHandler'
import DateRangePicker from './DateRangePicker'
import DayOffForecastData from './DayOffForecastData'
import useDayOffRange from '../hooks/useDayOffRange'

function Weather() {
  const { register, handleSubmit } = useForm()
  // eslint-disable-next-line no-unused-vars
  const [weather, setWeather] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState({})
  const initialErrorState = {
    has: false,
    code: 0,
    message: '',
  }
  const [error, setError] = useState(initialErrorState)

  const getLocation = useGeolocation
  const getForecast = useWeatherForecast

  useEffect(() => {
    const defineLocation = async () => {
      try {
        const geoLocation = await getLocation()
        setLocation(geoLocation)
      } catch (e) {
        setError({
          has: true,
          code: e.code,
          message: e.message,
        })
      }
    }

    defineLocation()
  }, [getLocation])

  // eslint-disable-next-line no-unused-vars
  const [rangeDates, setRangeDates] = useState({
    startDate: undefined,
    endDate: undefined,
  })

  // eslint-disable-next-line no-unused-vars
  const [dayOffForecastData, setDayOffForecastData] = useState([])

  const dayOffRangeHook = useDayOffRange

  const resetError = () => {
    setError(initialErrorState)
  }

  const onSubmit = (submitData) => {
    if (submitData.startDate !== '' && moment(submitData.startDate).isValid() && submitData.endDate !== ''
      && moment(submitData.endDate).isValid() && moment(submitData.endDate).diff(moment(submitData.startDate), 'd') > 0
    ) {
      setRangeDates({
        startDate: submitData.startDate,
        endDate: submitData.endDate,
      })
    }
  }

  useEffect(() => {
    const checkDayOffRange = async () => {
      if (typeof rangeDates.endDate !== 'undefined' && typeof rangeDates.startDate !== 'undefined') {
        const dayOffs = await dayOffRangeHook({
          startDate: rangeDates.startDate,
          endDate: rangeDates.endDate,
        })

        const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions()
        const forecast = await getForecast({
          latitude: Math.round((location.latitude + Number.EPSILON) * 100) / 100,
          longitude: Math.round((location.longitude + Number.EPSILON) * 100) / 100,
          timezone,
          daily: 'weathercode',
        })

        const dailyForecast = WeatherDataHandler.handle(forecast.daily)
        const finalDayOffForecastData = []
        // eslint-disable-next-line no-restricted-syntax
        for (const [dateOff, isDateDayOff] of Object.entries(dayOffs)) {
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

        setDayOffForecastData(finalDayOffForecastData)
      }
    }

    checkDayOffRange()
  }, [dayOffRangeHook, getForecast, location.latitude, location.longitude, rangeDates])

  const onError = (submitError) => console.debug(submitError)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box display="flex" flexDirection="column" gap="12px">
        <Box alignItems="flex-start" display="flex" gap="12px !important" flexDirection="column">
          <DateRangePicker register={register} />
          <input type="submit" />
        </Box>
        <Box>
          {!error.has && dayOffForecastData.length > 0
            && (
              <DayOffForecastData forecastData={dayOffForecastData} />
            )}
          {/* eslint-disable-next-line no-param-reassign */}
          {error.has && (
            <Alert onClose={resetError} severity="error">
              {`Невозможно определить геолокацию: ${error.message}`}
            </Alert>
          )}
        </Box>
      </Box>
    </form>
  )
}

Weather.propTypes = {}
Weather.defaultProps = {}

export default Weather
