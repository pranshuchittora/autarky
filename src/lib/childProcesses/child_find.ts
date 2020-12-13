import { sortQueriesRefinedPath, promptListParser } from "../utils";
import { FSSearch } from "../getLocation";

const StartIndexing = FILE_AGE => {
  const FSSearchInst = new FSSearch(FILE_AGE);
  const QueriedPathList = FSSearchInst.showFiles(process.cwd(), {
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
  switch (message.type) {
    case "START":
      const resp = StartIndexing(message.payload);
      process.send({ type: "DONE", payload: resp });
      break;
  }
});
