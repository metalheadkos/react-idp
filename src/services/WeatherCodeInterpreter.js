import { WMOCodes } from '../constants/WMOCodes'

export class WeatherCodeInterpreter {
  static interpretCode = (code) => WMOCodes[code]
}
