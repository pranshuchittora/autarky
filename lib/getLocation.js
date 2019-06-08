const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { TimeRelative } = require("./time");

const showFiles = (dir, filelist) => {
  filelist = filelist || [];
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.log("ERR_ACCESS_DENIED");
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
        const fileMTime = fileStats.mtime;
        console.log(absPath, chalk.yellow(TimeRelative(fileMTime)));
      } else if (fileStats.isDirectory()) filelist = showFiles(dir + "/" + file, filelist);
    } catch (e) {
      console.log("ERR_LOCATION_NOT_FOUND");
    }
  });
  return filelist;
};

module.exports = { showFiles };
