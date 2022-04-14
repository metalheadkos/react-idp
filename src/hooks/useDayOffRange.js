import moment from 'moment'
import { useEffect, useState } from 'react'
import { FetchHttpClient } from '../services/FetchHttpClient'

/**
 * @param {Date} startDate
 * @param {Date} endDate
 */
export default function useDayOffRange({ startDate, endDate }) {
  const [dayOffData, setDayOffData] = useState({})

  useEffect(() => {
    const checkDays = () => {
      if (typeof startDate !== 'undefined' && endDate !== 'undefined') {
        const startDateFormatted = moment(startDate).format('YYYYMMDD')
        const endDateFormatted = moment(endDate).format('YYYYMMDD')
        const url = `https://isdayoff.ru/api/getdata?date1=${startDateFormatted}&date2=${endDateFormatted}`
        return FetchHttpClient.get(url)
      }

      throw new Error('One of the dates is empty')
    }

    const getDatesFromRange = () => {
      const startMoment = moment(startDate)
      // count range length
      const rangeLength = moment(endDate).diff(startMoment, 'd') + 1
      let index = 0
      const dates = []
      const currentDate = startMoment.clone()

      while (index < rangeLength) {
        dates.push(currentDate.format('YYYY-MM-DD'))
        index += 1
        currentDate.add(1, 'd')
      }
      return dates
    }

    checkDays()
      .then((response) => response.text()
        .then((text) => {
          // handle results and assign to each date from range
          const datesFromRange = getDatesFromRange()
          const dayOffDataTmp = {}
          datesFromRange.forEach((date, index) => {
            dayOffDataTmp[date] = parseInt(text[index], 10) !== 0
          })

          setDayOffData(dayOffDataTmp)
        }))
  }, [endDate, startDate])

  return dayOffData
}
