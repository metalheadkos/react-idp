import React, { useEffect, useState } from 'react'
import useDayOff from '../hooks/useDayOff'
// import PropTypes from 'prop-types'

function IsDayOff() {
  const [date, setDate] = useState()
  // eslint-disable-next-line no-unused-vars
  const [isDayOff, setIsDayOff] = useState()

  const leftHook = useDayOff

  useEffect(() => {
    if (typeof date !== 'undefined') {
      console.log(leftHook(new Date(date)))
      setIsDayOff(leftHook(new Date(date)))
    }
  }, [date, leftHook])

  const dateChanged = (e) => {
    setDate(e.target.value)
  }

  return (
    <div className="flex gap-12 align-items-center">
      <input type="date" onChange={dateChanged} />
      <span>{isDayOff ? 'Day off' : 'Work day'}</span>
    </div>
  )
}

IsDayOff.propTypes = {
}

IsDayOff.defaultProps = {
}

export default IsDayOff
