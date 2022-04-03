import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

function DateRangePicker({ register }) {
  // todo: add dates validation???
  return (
    <>
      <Input register={register} name="startDate" label="Range Start" required />
      <Input register={register} name="endDate" label="Range End" required />
    </>
  )
}

DateRangePicker.propTypes = { register: PropTypes.func }
DateRangePicker.defaultProps = { register: () => {} }

export default DateRangePicker
