import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

import { TimeRelative } from "./time";
import { validDiff } from "./utils";

/**
 *
 * @param dir
 * @param filelist
 */
export const showFiles = (dir, filelist?: any) => {
  filelist = filelist || [];
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.log("ERR_ACCESS_DENIED", e);
    return filelist;
  }
  files.forEach(function(file) {
    try {
      const fileStats = fs.statSync(dir + "/" + file);
      const absPath = path.resolve(dir + "/" + file);
      if (fileStats.isDirectory() && absPath.includes("/.")) {
        return filelist;
      }
      if (fileStats.isDirectory() && file === "node_modules") {
        const fileMTime: any = fileStats.mtime;
        const timeCurrent: any = new Date();
        const timeDiff = timeCurrent - fileMTime;
        if (validDiff(timeDiff))
          console.log(absPath, chalk.yellow(TimeRelative(fileMTime)));
      } else if (fileStats.isDirectory()) filelist = showFiles(dir + "/" + file, filelist);
    } catch (e) {
      console.log("ERR_LOCATION_NOT_FOUND", e);
    }
  });
  return filelist;
};
