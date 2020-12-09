import React, { useState, useEffect } from "react";
import LogSymbols from "log-symbols";
import { Box, Text, Static } from "ink";
import { IntegerValidation } from "../lib/validation";
import store from "../redux/index";
import { CHANGE_AGE_CAP, UPDATE_DIRS_LIST } from "../redux/actionTypes";
import { APPEND_LOGS } from "../redux/reducers/UIReducer";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import { useSelector } from "react-redux";

import { sortQueriesRefinedPath, promptListParser } from "../lib/utils";
import { showFiles } from "../lib/getLocation";

const App = () => {
  const [RStore, setRStore] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newStoreState = store.getState();
      setRStore(newStoreState);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  return (
    <>
      <Header />
      <Box flexDirection="column">
        {SelectLogs(RStore).map((item: any) => {
          return <LogMessage key={item.id} {...item} />;
        })}

        {SelectFileAge(RStore) == null && <AgeQuestion />}
        {SelectFileAge(RStore) != null && <DirSelect />}
      </Box>
    </>
  );
};

export default App;

const AgeQuestion = () => {
  const label = "How old node_modules you wanna delete? (months)";

  let value;
  const handleSubmit = (val: string): void => {
    value = IntegerValidation.onDone(val);

    store.dispatch({ type: CHANGE_AGE_CAP, payload: { file_age: value } });
    store.dispatch({
      type: APPEND_LOGS,
      payload: { logSymbol: LogSymbols.success, label, value, id: "file_age" },
    });
    // console.log(JSON.stringify(store.getState(), null, 2));
  };
  return (
    <TextInput
      label={label}
      onChange={IntegerValidation.onChange}
      submit={handleSubmit}
    />
  );
};

const LogMessage = props => {
  return (
    <>
      <Box>
        <Box marginRight={1}>
          <Text>{props.logSymbol}</Text>
        </Box>
        <Box>
          <Text>{`${props.label}: ${props.value}`}</Text>
        </Box>
      </Box>
    </>
  );
};

const DirSelect = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const QueriedPathList = showFiles(process.cwd(), {
      filelist: [],
      RefinedFileList: [],
    });
    if (QueriedPathList.RefinedFileList.length > 0) {
      QueriedPathList.RefinedFileList = sortQueriesRefinedPath(
        QueriedPathList.RefinedFileList,
      );
      const ParsedList = promptListParser(QueriedPathList.RefinedFileList);
      setData(ParsedList);

      // if (Array.isArray(store.getState().config.dir_list))
      //   await promptDeleteConfirm();
    }
  }, []);

  return <Text>{JSON.stringify(data, null, 2)}</Text>;
};

const SelectFileAge = store => {
  return store.config.file_age;
};
const SelectLogs = store => {
  return store.UI.logs;
};
