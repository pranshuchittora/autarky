import React, { useState, useEffect, useCallback, useMemo } from "react";
import yn from "yn";
import { fork } from "child_process";
import path from "path";
import LogSymbols from "log-symbols";
import { Box, Text, Static } from "ink";
import MultiSelect from "ink-multi-select";

import { IntegerValidation } from "../lib/validation";
import store from "../redux/index";
import {
  CHANGE_AGE_CAP,
  UPDATE_DIRS_LIST,
  UPDATE_CONFIRMATION,
} from "../redux/actionTypes";
import { APPEND_LOGS } from "../redux/reducers/UIReducer";
import TextInput from "../components/TextInput";
import Header from "../components/Header";
import { useSelector } from "react-redux";

import Table from "../components/Table";
import { sortQueriesRefinedPath, promptListParser } from "../lib/utils";
import { showFiles } from "../lib/getLocation";
import Spinner from "ink-spinner";

const App = () => {
  return (
    <>
      <Header />
      <Box flexDirection="column">
        <Interrogator />
      </Box>
    </>
  );
};

export default App;

const Interrogator = () => {
  const [RStore, setRStore] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newStoreState = store.getState();
      setRStore(newStoreState);
      // console.log(JSON.stringify(newStoreState, null, 2));
    });

    return () => {
      // unsubscribe();
    };
  }, []);

  let question;
  if (SelectFileAge(RStore) === null) {
    question = <AgeQuestion />;
  } else if (SelectDirList(RStore) === null) {
    question = <DirSelect />;
  } else if (SelectConfirmation(RStore) === null) {
    question = (
      <>
        {/* <Table data={ParseDataForTable(SelectDirList(RStore))} count={1} /> */}
        <ConfirmDeletion count={SelectDirList(RStore)?.length} />
      </>
    );
  } else {
    <Spinner />;
  }

  return (
    <>
      {SelectLogs(RStore).map((item: any) => {
        return <LogMessage key={item.id} {...item} />;
      })}
      {question}
    </>
  );

  // return (
  //   <>
  //     {SelectLogs(RStore).map((item: any) => {
  //       return <LogMessage key={item.id} {...item} />;
  //     })}

  //     {SelectFileAge(RStore) === null ? <AgeQuestion /> : <DirSelect />}

  //     {
  //       <>
  //         <Table data={ParseDataForTable(SelectDirList(RStore))} count={1} />
  //         <ConfirmDeletion count={12} />
  //         </>
  //     }
  //     {/* <Table data={ParseDataForTable(SelectDirList(RStore))} count={1} /> */}
  //     {SelectDirList(RStore) && ! && (
  //       <>

  //       </>
  //     )}
  //   </>
  // );
};

const AgeQuestion = () => {
  const label = "How old node_modules you wanna delete? (months)";

  const handleSubmit = (val: string): void => {
    const value = IntegerValidation.onDone(val);

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
          <Text>{`${props.label} ${
            props.value ? ": " + props.value : ""
          }`}</Text>
        </Box>
      </Box>
    </>
  );
};

const DirSelect = () => {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const child = fork(path.resolve(path.join(__dirname, "child_compute.js")));
    child.send("START");
    child.on("error", err => {
      console.log("\n\t\tERROR: spawn failed! (" + err + ")");
    });
    child.on("message", message => {
      child.kill();

      store.dispatch({
        type: APPEND_LOGS,
        payload: {
          logSymbol: LogSymbols.success,
          label: "Indexing file system.",
          value: "",
          id: "indexing_fs",
        },
      });
      setData(message);
    });
    return () => {
      !child.killed ? child.kill() : null;
    };
  }, []);

  const handleSubmit = items => {
    setSelected(items);
    store.dispatch({
      type: UPDATE_DIRS_LIST,
      payload: {
        dir_list: items,
      },
    });

    // setSubmitted(true);
  };

  const RenderError =
    Array.isArray(selected) && selected.length == 0 ? (
      <Box>
        <Text color="red">Selet atleast one</Text>
      </Box>
    ) : (
      <Box>
        <Text color="yello">Selet directories to be deleted.</Text>
      </Box>
    );

  return (
    <>
      {data === null ? (
        <Box>
          <Spinner />
          <Text> Indexing the Disk</Text>
        </Box>
      ) : (
        <Box marginTop={1} flexDirection="column">
          {RenderError}
          <MultiSelect onSubmit={handleSubmit} items={data} />
        </Box>
      )}
    </>
  );
};

const SelectFileAge = store => {
  return store.config.file_age;
};
const SelectLogs = store => {
  return store.UI.logs;
};

const SelectDirList = store => {
  return store.config.dir_list;
};
const SelectConfirmation = store => {
  return store.config.confirmation;
};

const ParseDataForTable = data => {
  return data;
  // const newData = [...data]
  // return newData.map(obj => {
  //   obj.Location = obj.value;
  //   obj.Size = obj.size_label;
  //   obj.Time = obj.time_label;

  //   delete obj.value;
  //   delete obj.size_label;
  //   delete obj.time_label;
  //   delete obj.name;
  //   delete obj.label;
  //   delete obj.size;

  //   return obj;
  // });
};

const ConfirmDeletion = props => {
  const handleChange = q => {
    return q;
  };

  const label = `Confirm deleteing ${props.count} directories ? (y/n)`;

  const handleSubmit = (val: string): void => {
    const Response = yn(val);

    store.dispatch({
      type: APPEND_LOGS,
      payload: {
        logSymbol: Response ? LogSymbols.success : LogSymbols.error,
        label,
        value: val,
        id: "confirm_deletion",
      },
    });
    store.dispatch({
      type: UPDATE_CONFIRMATION,
      payload: Response,
    });

    // console.log(JSON.stringify(store.getState(), null, 2));
  };
  return (
    <TextInput onChange={handleChange} label={label} submit={handleSubmit} />
  );
};
