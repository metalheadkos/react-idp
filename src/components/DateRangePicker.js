import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Input from './Input'

function DateRangePicker({ register, getValues, onDateChanged }) {
  const validate = () => {
    const { startDate, endDate } = getValues()
    return moment(endDate).diff(moment(startDate), 'd') >= 0 || 'Start date should be less than end date'
  }

  return (
    <>
      <Input
        register={register}
        onDateChange={onDateChanged}
        name="startDate"
        validate={validate}
        label="Range Start"
        required
      />
      <Input register={register} onDateChange={onDateChanged} name="endDate" label="Range End" required />
    </>
  )
}

DateRangePicker.propTypes = { register: PropTypes.func, getValues: PropTypes.func, onDateChanged: PropTypes.func }
DateRangePicker.defaultProps = { register: () => {}, getValues: () => {}, onDateChanged: () => {} }

export default DateRangePicker
