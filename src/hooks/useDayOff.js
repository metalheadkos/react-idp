import moment from 'moment'
import { FetchHttpClient } from '../services/FetchHttpClient'

/**
 * @param {Date} date
 */
export default function useDayOff(date) {
  const checkDay = () => {
    if (typeof date !== 'undefined') {
      const dateFormatted = moment(date).format('YYYYMMDD')
      const url = `https://isdayoff.ru/${dateFormatted}`
      return FetchHttpClient.get(url)
    }

    throw new Error('Date is empty')
  }

  return checkDay().then((response) => response.text()
    .then((text) => Promise.resolve(parseInt(text, 10) !== 0)))
}
