import { WMOCodes } from '../constants/WMOCodes'

export class WeatherCodeInterpreter {
  static interpret(code) {
    return WMOCodes[code]
  }
}
