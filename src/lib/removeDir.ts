import rimraf = require("rimraf");

export function removeDir(pathToDir: any) {
  rimraf.sync(pathToDir);
}

export function removeDirBulk(DirList: String[]): void {
  DirList.forEach(absPath => {
    removeDir(absPath);
  });
}
