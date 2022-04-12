import React, { useState } from 'react'
import moment from 'moment'
import useDayOff from '../hooks/useDayOff'

function IsDayOff() {
  // set default today
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const isDayOff = useDayOff(new Date(date))

  const dateChanged = (e) => {
    if (e.target.value !== '' && moment(e.target.value).isValid()) {
      setDate(e.target.value)
    }
  }

  return (
    <div className="flex gap-12 align-items-center">
      <input type="date" onChange={dateChanged} value={date} />
      <span>{isDayOff ? 'Day off' : 'Working day'}</span>
    </div>
  )
}

IsDayOff.propTypes = {
}

IsDayOff.defaultProps = {
}

export default IsDayOff
