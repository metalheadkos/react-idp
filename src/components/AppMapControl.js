import React from 'react'
import PropTypes from 'prop-types'
import { useWatch } from 'react-hook-form'
import AppMap from './AppMap'
import Helpers from '../services/Helpers'

function AppMapControl({ center, control, setValue }) {
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
  control: PropTypes.instanceOf(Object),
  setValue: PropTypes.func,
}

AppMapControl.defaultProps = { center: [83, 54], control: {}, setValue: () => {} }

export default AppMapControl
