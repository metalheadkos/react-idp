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
import Helpers from '../services/Helpers'

function Weather() {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, getValues, control, setValue, formState, getFieldState } = useForm()

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
  const [rangeChanged, setRangeChanged] = useState(true)

  const resetError = () => {
    setError(initialErrorState)
  }

  const onSubmit = (submitData) => {
    console.log(submitData)
    setRangeChanged(false)
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
  const onDateChanged = () => {
    setRangeChanged(true)
    setRangeDates((prevState) => {
      let points = []
      if (!Helpers.isCoordsEmpty([location.longitude, location.latitude])) {
        points = [prevState.points[0]]
      }
      return { ...prevState, points }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box display="flex" flexDirection="column" gap="12px">
        <Box alignItems="flex-start" display="flex" gap="12px !important" flexDirection="column">
          <DateRangePicker register={register} getValues={getValues} onDateChanged={onDateChanged} />
          <AppMapControl
            center={fromLonLat([location.longitude, location.latitude])}
            control={control}
            setValue={setValue}
            points={formState.isSubmitted ? Helpers.convertCoordinates(rangeDates.points)
              : Helpers.convertCoordinates([[location.longitude, location.latitude]])}
          />
          <input type="submit" />
        </Box>
        <Box>
          {!error.has && dayOffForecastData.length > 0 && formState.isSubmitted && !formState.isSubmitting
            && !rangeChanged && (
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
