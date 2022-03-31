import React, { useEffect, useState } from 'react'
import useDayOff from '../hooks/useDayOff'

function IsDayOff() {
  const [date, setDate] = useState()
  const [isDayOff, setIsDayOff] = useState()

  const dayOffHook = useDayOff

  useEffect(() => {
    const checkDayOff = async () => {
      if (typeof date !== 'undefined') {
        setIsDayOff(await dayOffHook(new Date(date)))
      }
    }

    checkDayOff()
  }, [date, dayOffHook])

  const dateChanged = (e) => {
    setDate(e.target.value)
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
