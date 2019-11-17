import path from "path";
import chalk from "chalk";

import { TimeRelative } from "./time";
import { TimeMonthToMilli } from "./time";
import { IConfig, IPromptSelect, IRefinedListItem } from "./Interfaces";
import configFile from "../config.json";
import store from "../redux/index";
/**
 *
 * @param timeVal
 */
export function validDiff(timeVal, config: IConfig = configFile) {
  const MinTimeThreshold = TimeMonthToMilli(
    store.getState().config.file_age
    // configFile.file_age
  );
  return timeVal >= MinTimeThreshold ? true : false;
}

/**
 *
 * @param List
 */
export function promptListParser(List: Object[]): Object[] {
  let ParsedList: Object[] = [];

  List.forEach((item: IRefinedListItem) => {
    let ItemObj: IPromptSelect = {
      title:
        path.relative(process.cwd(), item.path) +
        " -  " +
        chalk.yellow(TimeRelative(item.age)) +
        "\n",
      value: item.path
    };
    ParsedList.push(ItemObj);
  });

  return ParsedList;
}

export function sortQueriesRefinedPath(RefinedFileList: any) {
  RefinedFileList.sort(function(a, b) {
    const keyA = a.age;
    const keyB = b.age;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return RefinedFileList;
}
