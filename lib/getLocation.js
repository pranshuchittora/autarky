const fs = require("fs");
const path = require("path");

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
        console.log(absPath, new Date(fileStats.mtime));
      } else if (fileStats.isDirectory()) filelist = showFiles(dir + "/" + file, filelist);
    } catch (e) {
      console.log("ERR_LOCATION_NOT_FOUND");
    }
  });
  return filelist;
};

module.exports = { showFiles };
