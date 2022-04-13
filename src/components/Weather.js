import React, { useState } from 'react'
import { Alert, Box, Card, Typography } from '@mui/material'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import useGeolocation from '../hooks/useGeolocation'
import useWeatherForecast from '../hooks/useWeatherForecast'
import Input from './Input'
import useDayOff from '../hooks/useDayOff'

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
  const { register, handleSubmit } = useForm()

  const initialErrorState = {
    has: false,
    code: 0,
    message: '',
  }
  const [error, setError] = useState(initialErrorState)
  const [date, setDate] = useState()
  const { location } = useGeolocation()
  // eslint-disable-next-line no-unused-vars
  const { forecast: weather, result, reason } = useWeatherForecast(location, date)

  // eslint-disable-next-line no-unused-vars
  const isDayOff = useDayOff(date)

  const resetError = () => {
    setError(initialErrorState)
  }

  const onSubmit = (submitData) => {
    if (submitData.date !== '' && moment(submitData.date).isValid()) {
      setDate(submitData.date)
    }
  }

  const checkDateForForecast = (selectedDate) => {
    let hasForecast = false
    const sdMoment = moment(selectedDate)

    // eslint-disable-next-line no-unused-expressions
    weather !== undefined && weather.forEach((wItem) => {
      const wItemMoment = wItem.date
      if (sdMoment.diff(wItemMoment, 'd') === 0) {
        hasForecast = true
      }
    })

    return hasForecast
  }

  const onError = (submitError) => console.debug(submitError)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box display="flex" flexDirection="column" gap="12px">
        <Box alignItems="center" display="flex" gap="12px !important">
          <Input register={register} name="date" required="required" />
          <input type="submit" />
          {/* for days without forecast */}
          {!checkDateForForecast(date) && <span>{isDayOff !== undefined && (isDayOff ? 'Day off' : 'Working day')}</span>}
        </Box>
        <Box>
          {!error.has && Array.isArray(weather) && weather.length > 0
            && (
              <Box display="flex" flexWrap="wrap" gap="12px">
                {weather.map((wItem) => (
                  <Card sx={cardStyles} key={wItem.uuid}>
                    <Typography variant="body1">
                      {wItem.date}
                    </Typography>
                    <Typography sx={{ mb: 0.5 }} color="text.secondary">
                      {wItem.humanReadableWeather}
                    </Typography>
                    {date === wItem.date && (
                      <Typography sx={{ mb: 0.5 }} variant="body2">
                        {isDayOff !== undefined && (isDayOff ? 'Day off' : 'Working day')}
                      </Typography>
                    )}
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
    </form>
  )
}

Weather.propTypes = {}
Weather.defaultProps = {}

export default Weather
