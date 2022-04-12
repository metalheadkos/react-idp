import React, { useEffect, useState } from 'react'
import { Alert, Box, Card, Typography } from '@mui/material'
import moment from 'moment'
import useGeolocation from '../hooks/useGeolocation'
import useWeatherForecast from '../hooks/useWeatherForecast'
// import useDayOff from '../hooks/useDayOff'
// import { WeatherDataHandler } from '../services/WeatherDataHandler'

const cardStyles = {
  padding: '.5rem !important',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 160,
  maxWidth: 160,
}

function Weather() {
  // eslint-disable-next-line no-unused-vars
  const [weather, setWeather] = useState([])

  const initialErrorState = {
    has: false,
    code: 0,
    message: '',
  }
  const [error, setError] = useState(initialErrorState)

  const { location } = useGeolocation()
  if (Object.hasOwnProperty.call(location, 'message')) {
    setError({
      has: true,
      code: location.code,
      message: location.message,
    })
  }
  console.log(location)

  const getForecast = useWeatherForecast
  const [date, setDate] = useState()
  // eslint-disable-next-line no-unused-vars
  // const isDayOff = useDayOff(new Date(date))

  useEffect(() => {
    // const checkDayOff = async () => {
    //   if (typeof date !== 'undefined') {
    //     setIsDayOff(await dayOffHook(new Date(date)))
    //     const { timeZone: timezone } = Intl.DateTimeFormat().resolvedOptions()
    //     const forecast = await getForecast({
    //       latitude: Math.round((location.latitude + Number.EPSILON) * 100) / 100,
    //       longitude: Math.round((location.longitude + Number.EPSILON) * 100) / 100,
    //       timezone,
    //       daily: 'weathercode',
    //     })
    //     setWeather(WeatherDataHandler.handle(forecast.daily))
    //   } else {
    //     setIsDayOff(undefined)
    //   }
    // }
    //
    // checkDayOff()
  }, [date, getForecast, location.latitude, location.longitude])

  const dateChanged = (e) => {
    if (e.target.value !== '' && moment(e.target.value).isValid()) {
      setDate(e.target.value)
    } else {
      setDate(undefined)
    }
  }

  const resetError = () => {
    setError(initialErrorState)
  }

  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Box alignItems="center" display="flex" gap="12px !important">
        <input type="date" onChange={dateChanged} />
        {/* <span>{isDayOff !== undefined && (isDayOff ? 'Day off' : 'Working day')}</span> */}
      </Box>
      <Box>
        {!error.has && weather.length > 0
          && (
            <Box display="flex" flexWrap="wrap" gap="12px">
              {weather.map((wItem) => (
                <Card sx={cardStyles} key={wItem.uuid}>
                  <Typography variant="body1">
                    {wItem.date}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {wItem.humanReadableWeather}
                  </Typography>
                </Card>
              ))}
            </Box>
          )}
        {/* eslint-disable-next-line no-param-reassign */}
        {error.has && (
        <Alert onClose={resetError} severity="error">
          {`Невозможно определить геолокацию: ${error.message}`}
        </Alert>
        )}
      </Box>
    </Box>
  )
}

Weather.propTypes = {}
Weather.defaultProps = {}

export default Weather
