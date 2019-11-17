#!/usr/bin/env node

import { showFiles } from "./lib/getLocation";
import { promptMultiSelectDir } from "./lib/prompter";

const QueriedPathList = showFiles("../../", {
  filelist: [],
  RefinedFileList: []
});
promptMultiSelectDir(QueriedPathList.RefinedFileList);
