import { sortQueriesRefinedPath, promptListParser } from "../lib/utils";
import { showFiles } from "../lib/getLocation";

const StartIndexing = () => {
  const QueriedPathList = showFiles(process.cwd(), {
    filelist: [],
    RefinedFileList: [],
  });

  if (QueriedPathList.RefinedFileList.length > 0) {
    QueriedPathList.RefinedFileList = sortQueriesRefinedPath(
      QueriedPathList.RefinedFileList,
    );
    return promptListParser(QueriedPathList.RefinedFileList);
  }
  return [];
};
process.on("message", message => {
  if (message == "START") {
    const resp = StartIndexing();
    process.send(resp);
  }
});
