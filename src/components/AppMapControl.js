import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useWatch } from 'react-hook-form'
import AppMap from './AppMap'
import Helpers from '../services/Helpers'

function AppMapControl({ center, control, handler }) {
  // eslint-disable-next-line no-unused-vars
  const [dates, setDates] = useState([])
  const startDate = useWatch({
    control,
    name: 'startDate',
  })
  const endDate = useWatch({
    control,
    name: 'endDate',
  })

  return (
    <Controller
      control={control}
      name="map"
      render={() => {
        if (startDate && endDate) {
          const datess = Helpers.getDatesFromRange({ startDate, endDate })
          return (
            <AppMap
              center={!Helpers.isCoordsEmpty(center) ? center : undefined}
              startPoint={!Helpers.isCoordsEmpty(center) ? center : undefined}
              handler={handler}
              limit={datess.length}
            />
          )
        }

        return null
      }}
    />
  )
}

AppMapControl.propTypes = {
  center: PropTypes.instanceOf(Array),
  control: PropTypes.instanceOf(Object),
  handler: PropTypes.func,
}

AppMapControl.defaultProps = { center: [83, 54], control: {}, handler: () => {} }

export default AppMapControl
