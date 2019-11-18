#!/usr/bin/env node

import chalk from "chalk";

import { showFiles } from "./lib/getLocation";
import {
  promptMultiSelectDir,
  promptAgeSelect,
  promptDeleteConfirm
} from "./lib/prompter";
import { sortQueriesRefinedPath } from "./lib/utils";
import store from "./redux/index";

(async function() {
  await promptAgeSelect();
  const QueriedPathList = showFiles(process.cwd(), {
    filelist: [],
    RefinedFileList: []
  });

  if (QueriedPathList.RefinedFileList.length > 0) {
    QueriedPathList.RefinedFileList = sortQueriesRefinedPath(
      QueriedPathList.RefinedFileList
    );
    await promptMultiSelectDir(QueriedPathList.RefinedFileList);
    if (Array.isArray(store.getState().config.dir_list))
      await promptDeleteConfirm();
  } else {
    await console.log(
      chalk.bgCyan("Oops! Your node_modules are too young to be deleted 😉")
    );
  }
  return;
})();
