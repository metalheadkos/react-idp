import moment from 'moment'
import { transform } from 'ol/proj'

class Helpers {
  static isDefined = (value) => typeof value !== 'undefined'

  static isUndefined = (value) => typeof value === 'undefined'

  static isCoordsEmpty = (value) => Array.isArray(value)
    && (this.isUndefined(value[0]) || Number.isNaN(value[0]))
    && (this.isUndefined(value[1]) || Number.isNaN(value[1]))

  /**
   * @param startDate
   * @param endDate
   * @returns {string[]}
   */
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

  /**
   * @param {Array<Feature>} features
   */
  static extractCoordinates(features) {
    const coordinates = []
    features.forEach((f) => coordinates.push(transform(f.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326')))

    return coordinates
  }
}

export default Helpers
