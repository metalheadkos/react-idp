import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const cardStyles = {
  padding: '.5rem !important',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  minWidth: 160,
  maxWidth: 160,
}

function DayOffForecastData({ forecastData }) {
  // do something

  return (
    <Box display="flex" flexWrap="wrap" gap="12px">
      {forecastData.map((wItem) => (
        <Card sx={cardStyles} key={wItem.uuid}>
          <Typography variant="body1">
            {wItem.date}
          </Typography>
          {wItem.forecast.exist && wItem.forecast.data.humanReadableWeather && (
          <Typography sx={{ mb: 1 }} color="text.secondary">
            {wItem.forecast.data.humanReadableWeather}
          </Typography>
          )}
          {!wItem.forecast.exist && (
            <Typography sx={{ mb: 1, textAlign: 'center' }} color="text.secondary">
              Невозможно определить прогноз погоды на этот день
            </Typography>
          )}
          <Typography sx={{ mb: 0.5 }} variant="body2">
            {wItem.isDayOff !== undefined && (wItem.isDayOff ? 'Day off' : 'Working day')}
          </Typography>
        </Card>
      ))}
    </Box>
  )
}

DayOffForecastData.propTypes = { forecastData: PropTypes.instanceOf(Array) }
DayOffForecastData.defaultProps = { forecastData: [] }

export default DayOffForecastData
