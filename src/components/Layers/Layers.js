import React from 'react'
import PropTypes from 'prop-types'

export default function Layers({ children }) {
  return <div>{children}</div>
}

Layers.propTypes = { children: PropTypes.arrayOf(PropTypes.element) }
Layers.defaultProps = { children: [] }
