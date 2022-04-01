import { v4 as uuidv4 } from 'uuid'
import { WeatherCodeInterpreter } from './WeatherCodeInterpreter'

export class WeatherDataHandler {
  /**
   * Reformat data from API
   * @param {array<string>} time
   * @param {array<number>} weatercode
   */
  static handle({ time, weathercode: weatherCode }) {
    const handledData = []
    let reason = 'One of parameters is not an array'
    if (Array.isArray(time) && Array.isArray(weatherCode)) {
      const timeLength = time.length
      const weatherCodeLength = weatherCode.length
      if (weatherCodeLength === timeLength) {
        time.forEach((date, index) => {
          handledData.push({
            date,
            weatherCode: weatherCode[index],
            humanReadableWeather: WeatherCodeInterpreter.interpret(weatherCode[index]),
            uuid: uuidv4(),
          })
        })

        return handledData
      }

      reason = 'Date and weather code arrays have different length'
    }

    throw new Error(`Incorrect input data: ${reason}`)
  }
}
