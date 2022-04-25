import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

// eslint-disable-next-line no-unused-vars
const Input = forwardRef(({ name, register, required, label, validate, onDateChange }, ref) => (
  <Box>
    <label style={{ paddingRight: '0.5rem' }} htmlFor={name}>{label}</label>
    <input {...register(name, { validate, onChange: onDateChange })} type="date" required={required} />
  </Box>
))

Input.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  validate: PropTypes.func,
  onDateChange: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string,
}

Input.defaultProps = {
  name: '', register: () => {}, validate: () => {}, onDateChange: () => {}, required: true, label: '',
}

export default Input
