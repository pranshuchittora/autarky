import rimraf from "rimraf";
import chalk from "chalk";

export function removeDir(pathToDir: any) {
  rimraf(pathToDir, err => {
    if (err) {
      console.log(chalk.red(err));
    }
  });
}

export function removeDirBulk(DirList: String[]): void {
  DirList.forEach(absPath => {
    removeDir(absPath);
  });
  process.stdout.write(
    chalk.green(`\nDeleted directories successfully 🎉\n\n`)
  );
}
