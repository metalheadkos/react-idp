import moment from 'moment'
import { FetchHttpClient } from '../services/FetchHttpClient'

/**
 * @param {Date} date
 */
export default function useDayOff(date) {
  const dateFormatted = moment(date).format('YYYYMMDD')
  const url = `https://isdayoff.ru/${dateFormatted}`
  FetchHttpClient.get(url)
    .then((response) => {
      response.text()
        .then((text) => console.log(parseInt(text, 10) !== 0))
    })
}
