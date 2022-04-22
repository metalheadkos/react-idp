import React, { useState } from 'react'
import { Alert, Box } from '@mui/material'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { fromLonLat } from 'ol/proj'
import useGeolocation from '../hooks/useGeolocation'
import DateRangePicker from './DateRangePicker'
import DayOffForecastData from './DayOffForecastData'
import useDayOffAndWeatherCombination from '../hooks/useDayOffAndWeatherCombination'
import AppMapControl from './AppMapControl'

function Weather() {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, getValues, control, setValue } = useForm()

  const [rangeDates, setRangeDates] = useState({
    startDate: undefined,
    endDate: undefined,
    points: [],
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
    console.log(submitData)
    resetError()
    if (submitData.startDate !== '' && moment(submitData.startDate).isValid() && submitData.endDate !== ''
      && moment(submitData.endDate).isValid() && moment(submitData.endDate).diff(moment(submitData.startDate), 'd') > 0
    ) {
      setRangeDates(submitData)
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
          <AppMapControl
            center={fromLonLat([location.longitude, location.latitude])}
            control={control}
            setValue={setValue}
          />
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
