import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import AppMap from './AppMap'
import Helpers from '../services/Helpers'

// eslint-disable-next-line no-unused-vars,react/prop-types
function AppMapControl({ center, control, watch, handler }) {
  // eslint-disable-next-line no-unused-vars
  const [dates, setDates] = useState([])

  return (
    <Controller
      control={control}
      name="map"
      render={() => {
        const { startDate, endDate } = watch()
        if (startDate && endDate) {
          const datess = Helpers.getDatesFromRange({ startDate, endDate })
          return <AppMap center={center} handler={handler} limit={datess.length} />
        }

        return null
      }}
    />
  )
}

AppMapControl.propTypes = { center: PropTypes.instanceOf(Array) }

AppMapControl.defaultProps = { center: [83, 54] }

export default AppMapControl
