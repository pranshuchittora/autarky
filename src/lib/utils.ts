import { TimeMonthToMilli } from "./time";

import configFile from "../config.json";
interface IConfig {
  file_age: any;
}
/**
 *
 * @param timeVal
 */
export function validDiff(timeVal, config: IConfig = configFile) {
  const MinTimeThreshold = TimeMonthToMilli(config.file_age);
  return timeVal >= MinTimeThreshold ? true : false;
}
