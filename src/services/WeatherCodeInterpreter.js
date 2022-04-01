import { WMOCodes } from '../constants/WMOCodes'

export class WeatherCodeInterpreter {
  static interpret = (code) => WMOCodes[code]
}
