import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Box } from '@mui/material'
import useDayOff from '../hooks/useDayOff'
import Weather from './Weather'

/**
 * @deprecated
 * @returns {JSX.Element}
 * @constructor
 */
function IsDayOff() {
  const [date, setDate] = useState()
  const [isDayOff, setIsDayOff] = useState()

  const dayOffHook = useDayOff

  useEffect(() => {
    const checkDayOff = async () => {
      if (typeof date !== 'undefined') {
        setIsDayOff(await dayOffHook(new Date(date)))
      } else {
        setIsDayOff(undefined)
      }
    }

    checkDayOff()
  }, [date, dayOffHook])

  const dateChanged = (e) => {
    if (e.target.value !== '' && moment(e.target.value).isValid()) {
      setDate(e.target.value)
    } else {
      setDate(undefined)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Box alignItems="center" display="flex" gap="12px !important">
        <input type="date" onChange={dateChanged} />
        <span>{isDayOff !== undefined && (isDayOff ? 'Day off' : 'Working day')}</span>
      </Box>
      <Box>
        <Weather />
      </Box>
    </Box>
  )
}

IsDayOff.propTypes = {}
IsDayOff.defaultProps = {}

export default IsDayOff
