import moment from 'moment'
import { useEffect, useState } from 'react'
import { FetchHttpClient } from '../services/FetchHttpClient'

/**
 * @param {Date | string} date
 */
export default function useDayOff(date) {
  const [isDayOff, setIsDayOff] = useState(undefined)

  useEffect(() => {
    const checkDay = () => {
      if (typeof date !== 'undefined' && moment(date).isValid()) {
        const dateFormatted = moment(date).format('YYYYMMDD')
        const url = `https://isdayoff.ru/${dateFormatted}`
        return FetchHttpClient.get(url)
      }

      return Promise.reject()
    }

    checkDay()
      .then((response) => response.text()
        .then((text) => setIsDayOff(parseInt(text, 10) !== 0)))
      .catch(() => setIsDayOff(undefined))
  }, [date])

  return isDayOff
}
