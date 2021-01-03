import path from "path";
import chalk from "chalk";
import getSize from "g-factor";

import { TimeRelative } from "@app/lib/time";
import { TimeMonthToMilli } from "@app/lib/time";
import { IPromptSelect, IRefinedListItem } from "@app/lib/Interfaces";

/**
 *
 * @param timeVal
 */
export function validDiff(timeVal, FILE_AGE) {
  const MinTimeThreshold = TimeMonthToMilli(FILE_AGE);
  return timeVal >= MinTimeThreshold ? true : false;
}

/**
 *
 * @param List
 */
export function promptListParser(List: Object[]): Object[] {
  let ParsedList: Object[] = [];

  List.forEach((item: IRefinedListItem) => {
    const FileSize = getSize(item.path);
    let ItemObj: IPromptSelect = {
      name: path.relative(process.cwd(), item.path),
      value: item.path,
      size: FileSize.SIZE_Number,
      label:
        " " +
        path.relative(process.cwd(), item.path) +
        " - " +
        chalk.magentaBright(FileSize.SIZE_Parsed) +
        " " +
        chalk.cyanBright(TimeRelative(item.age) + " old"),
      size_label: FileSize.SIZE_Parsed,
      time_label: TimeRelative(item.age) + " old",
    };
    ParsedList.push(ItemObj);
  });

  return ParsedList;
}

export function sortQueriesRefinedPath(RefinedFileList: IRefinedListItem[]) {
  RefinedFileList.sort(function(a: IRefinedListItem, b: IRefinedListItem) {
    const keyA = a.age;
    const keyB = b.age;
    // Compares the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return RefinedFileList;
}

export function findTotalSize(InputArr: IPromptSelect[] | any[]): number {
  let sum = 0;
  InputArr.forEach(eObj => {
    sum += eObj.size;
  });
  return sum;
}
