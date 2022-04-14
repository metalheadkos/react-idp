import moment from 'moment'

class Helpers {
  static isDefined = (value) => typeof value !== 'undefined'

  static isUndefined = (value) => typeof value === 'undefined'

  static getDatesFromRange = ({ startDate, endDate }) => {
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
}

export default Helpers
