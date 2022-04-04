import React from 'react'
import { Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography } from '@mui/material'
import PropTypes from 'prop-types'

function DayOffForecastData({ forecastData }) {
  // do something

  return (
    <TableContainer sx={{ width: 'fit-content' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Day off / Working day</TableCell>
            <TableCell>Forecast</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecastData.map((row) => (
            <TableRow
              key={row.uuid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.isDayOff !== undefined && (row.isDayOff ? 'Day off' : 'Working day')}</TableCell>
              <TableCell>
                {row.forecast.exist && row.forecast.data.humanReadableWeather && (
                  <Typography color="text.secondary">
                    {row.forecast.data.humanReadableWeather}
                  </Typography>
                )}
                {!row.forecast.exist && (
                  <Typography color="text.secondary">
                    Невозможно определить прогноз погоды на этот день
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

DayOffForecastData.propTypes = { forecastData: PropTypes.instanceOf(Array) }
DayOffForecastData.defaultProps = { forecastData: [] }

export default DayOffForecastData
