import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const Input = forwardRef(({ name, register, required }, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <input {...register(name)} type="date" required={required} />
))

Input.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.string,
}
Input.defaultProps = { name: '', register: () => {}, required: '' }

export default Input
