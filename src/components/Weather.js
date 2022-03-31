import React, { useEffect, useState } from 'react'
import { Alert, Box } from '@mui/material'
import moment from 'moment'
import useGeolocation from '../hooks/useGeolocation'
import useWeatherForecast from '../hooks/useWeatherForecast'
import useDayOff from '../hooks/useDayOff'

function Weather() {
  // eslint-disable-next-line no-unused-vars
  const [weather, setWeather] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState({})
  const [error, setError] = useState({
    has: false,
    code: 0,
    message: '',
  })
  // eslint-disable-next-line no-unused-vars
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

  const [date, setDate] = useState()
  const [isDayOff, setIsDayOff] = useState()

  const dayOffHook = useDayOff

  useEffect(() => {
    const checkDayOff = async () => {
      if (typeof date !== 'undefined') {
        setIsDayOff(await dayOffHook(new Date(date)))
        const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions()
        const forecast = await getForecast({
          latitude: Math.round((location.latitude + Number.EPSILON) * 100) / 100,
          longitude: Math.round((location.longitude + Number.EPSILON) * 100) / 100,
          timezone,
          daily: 'weathercode',
        })
        setWeather(forecast.daily)
        console.log(forecast)
        // todo: add weather displaying
      } else {
        setIsDayOff(undefined)
      }
    }

    checkDayOff()
  }, [date, dayOffHook, getForecast, location.latitude, location.longitude])

  const dateChanged = (e) => {
    if (e.target.value !== '' && moment(e.target.value).isValid()) {
      setDate(e.target.value)
    } else {
      setDate(undefined)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Box alignItems="center" display="flex" gap="12px !important">
        <input type="date" onChange={dateChanged} />
        <span>{isDayOff !== undefined && (isDayOff ? 'Day off' : 'Working day')}</span>
      </Box>
      <Box>
        {error.has && <Alert onClose={() => { }} severity="error">{`${error.code}: ${error.message}`}</Alert>}
        <Box />
      </Box>
    </Box>
  )
}

Weather.propTypes = {}
Weather.defaultProps = {}

export default Weather
