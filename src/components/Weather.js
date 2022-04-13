import React, { useState } from 'react'
import { Alert, Box, Card, Typography } from '@mui/material'
import moment from 'moment'
import useWeatherForecast from '../hooks/useWeatherForecast'
import useGeolocation from '../hooks/useGeolocation'

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
  const [date, setDate] = useState()
  const { location } = useGeolocation()
  const { forecast: weather, result, reason } = useWeatherForecast(location, date)

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
        {/* <span>{isDayOff !== undefined && (isDayOff ? 'Day off' : 'Working day')}</span> */}
      </Box>
      <Box>
        { date !== undefined && weather !== undefined && weather.length > 0
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
        {result !== undefined && !result && Object.hasOwnProperty.call(reason, 'description') && (
        <Alert severity="error">
          {`Невозможно определить геолокацию: ${reason.description.message}`}
        </Alert>
        )}
      </Box>
    </Box>
  )
}

Weather.propTypes = {}
Weather.defaultProps = {}

export default Weather
