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

interface IPromptSelect {
  title: String;
  value: String;
}
/**
 *
 * @param List
 */
export function promptListParser(List: Object[]): Object[] {
  let ParsedList: Object[] = [];

  List.forEach(item => {
    let ItemObj: IPromptSelect = {
      title: item.path,
      value: item.path
    };
    ParsedList.push(ItemObj);
  });

  return ParsedList;
}
