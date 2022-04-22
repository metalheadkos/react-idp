import React from 'react'
import PropTypes from 'prop-types'
import { useWatch } from 'react-hook-form'
import AppMap from './AppMap'
import Helpers from '../services/Helpers'

// eslint-disable-next-line no-unused-vars
function AppMapControl({ center, control, setValue, points }) {
  const startDate = useWatch({
    control,
    name: 'startDate',
  })
  const endDate = useWatch({
    control,
    name: 'endDate',
  })

  const handler = (mPoints) => {
    setValue('points', mPoints)
  }

  return (
    (startDate && endDate) ? (
      <AppMap
        center={!Helpers.isCoordsEmpty(center) ? center : undefined}
        startPoint={!Helpers.isCoordsEmpty(center) ? center : undefined}
        handler={handler}
        limit={Helpers.getDatesFromRange({ startDate, endDate }).length}
      />
    ) : null
  )
}

AppMapControl.propTypes = {
  center: PropTypes.instanceOf(Array),
  points: PropTypes.instanceOf(Array),
  control: PropTypes.instanceOf(Object),
  setValue: PropTypes.func,
}

AppMapControl.defaultProps = { center: [83, 54], control: {}, setValue: () => {}, points: [] }

export default AppMapControl
