import React, { useEffect, useState } from 'react'
import moment from 'moment'
import useDayOff from '../hooks/useDayOff'

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
    <div className="flex gap-12 align-items-center">
      <input type="date" onChange={dateChanged} />
      <span>{isDayOff !== undefined && (isDayOff ? 'Day off' : 'Working day')}</span>
    </div>
  )
}

IsDayOff.propTypes = {
}

IsDayOff.defaultProps = {
}

export default IsDayOff
