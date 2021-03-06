import React, { useState } from 'react'
import { Alert, Box } from '@mui/material'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import useGeolocation from '../hooks/useGeolocation'
import DateRangePicker from './DateRangePicker'
import DayOffForecastData from './DayOffForecastData'
import useDayOffAndWeatherCombination from '../hooks/useDayOffAndWeatherCombination'

function Weather() {
  const { register, handleSubmit, getValues } = useForm()
  // eslint-disable-next-line no-unused-vars
  const [rangeDates, setRangeDates] = useState({
    startDate: undefined,
    endDate: undefined,
  })
  const { location } = useGeolocation()
  const dayOffForecastData = useDayOffAndWeatherCombination(rangeDates, location)

  const initialErrorState = {
    has: false,
    code: 0,
    message: '',
  }
  const [error, setError] = useState(initialErrorState)

  const resetError = () => {
    setError(initialErrorState)
  }

  const onSubmit = (submitData) => {
    resetError()
    if (submitData.startDate !== '' && moment(submitData.startDate).isValid() && submitData.endDate !== ''
      && moment(submitData.endDate).isValid() && moment(submitData.endDate).diff(moment(submitData.startDate), 'd') > 0
    ) {
      setRangeDates({
        startDate: submitData.startDate,
        endDate: submitData.endDate,
      })
    }
  }

  const onError = (submitError) => {
    setError({
      code: 1,
      has: true,
      message: submitError.startDate.message,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box display="flex" flexDirection="column" gap="12px">
        <Box alignItems="flex-start" display="flex" gap="12px !important" flexDirection="column">
          <DateRangePicker register={register} getValues={getValues} />
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
              {`Application Error: ${error.message}`}
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
