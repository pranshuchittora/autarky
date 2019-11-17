#!/usr/bin/env node

import { showFiles } from "./lib/getLocation";
import { promptMultiSelectDir, promptAgeSelect } from "./lib/prompter";
import { sortQueriesRefinedPath } from "./lib/utils";

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
  } else {
    console.log("Oops! Your node_modules are still young 😉");
  }
  return;
})();
