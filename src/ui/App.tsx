import React, { useState, useEffect, useCallback, useMemo } from "react";
import chalk from "chalk";
import { convertBytes } from "g-factor";
import yn from "yn";
import { fork } from "child_process";
import path from "path";
import LogSymbols from "log-symbols";
import { Box, Text } from "ink";
import MultiSelect from "ink-multi-select";
import Spinner from "ink-spinner";

import { IntegerValidation } from "@app/lib/validation";
import { findTotalSize } from "@app/lib/utils";
import store from "@app/redux/index";
import {
  CHANGE_AGE_CAP,
  UPDATE_DIRS_LIST,
  UPDATE_CONFIRMATION,
} from "@app/redux/reducers/ConfigReducer";
import { APPEND_LOGS } from "@app/redux/reducers/UIReducer";
import TextInput from "@app/ui/components/TextInput";
import Header from "@app/ui/components/Header";
import Table from "@app/ui/components/Table";

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
    });

    return () => {
      unsubscribe();
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
        <Table data={SelectDirList(RStore)} count={1} />
        <ConfirmDeletion count={SelectDirList(RStore)?.length} />
      </>
    );
  } else {
    question = (
      <>
        <Table data={SelectDirList(RStore)} count={1} />
        <RemoveDirs />
      </>
    );
  }

  return (
    <>
      {SelectLogs(RStore).map((item: any) => {
        return <LogMessage key={item.id} {...item} />;
      })}
      {question}
    </>
  );
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
  const [done, setDone] = useState(false);
  useEffect(() => {
    const child = fork(path.resolve(__dirname, "child_find.js"));

    child.send({ type: "START", payload: SelectFileAge(store.getState()) });
    child.on("error", err => {
      console.log("\n\t\tERROR: spawn failed! (" + err + ")");
    });
    child.on("message", (message: any) => {
      const { type, payload } = message;
      switch (type) {
        case "DONE": {
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
          setDone(true);
          if (Array.isArray(payload) && payload.length == 0) {
            store.dispatch({
              type: APPEND_LOGS,
              payload: {
                logSymbol: LogSymbols.info,
                label: "Oops! Your node_modules are too young to be deleted.",
                value: "",
                id: "no_dir_found",
              },
            });
            process.exit(0);
          }

          setData(payload);
          break;
        }
        case "MESSAGE": {
          console.log(payload);
        }
      }
    });
    return () => {
      !child.killed ? child.kill() : null;
    };
  }, []);

  const handleSubmit = items => {
    setSelected(items);
    if (Array.isArray(items) && items.length > 0) {
      store.dispatch({
        type: UPDATE_DIRS_LIST,
        payload: {
          dir_list: items,
        },
      });
    }
  };

  const RenderError = (
    <Box borderStyle="round" justifyContent="center">
      {Array.isArray(selected) && selected.length == 0 ? (
        <Text color="redBright">Select atleast one.</Text>
      ) : (
        <Text color="yellowBright">Selet directories to be deleted.</Text>
      )}
    </Box>
  );

  if (!done) {
    return (
      <Box>
        <Spinner />
        <Text> Indexing the Disk</Text>
      </Box>
    );
  }

  return (
    <>
      {data != null && (
        <Box flexDirection="column">
          {RenderError}
          <MultiSelect onSubmit={handleSubmit} items={data} limit={10} />
        </Box>
      )}
    </>
  );
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

    if (Response === false) {
      process.exit(0);
    }

    store.dispatch({
      type: UPDATE_CONFIRMATION,
      payload: Response,
    });
  };
  return (
    <TextInput onChange={handleChange} label={label} submit={handleSubmit} />
  );
};

const RemoveDirs = () => {
  const [done, setDone] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const Dir_List = SelectDirList(store.getState());
    const Resolved_Path_List = Dir_List.map(e => {
      return e.value;
    });
    const TOTAL_SIZE = findTotalSize(Dir_List);

    const child = fork(path.resolve(__dirname, "child_delete.js"));

    child.send({ type: "START", payload: Resolved_Path_List });
    child.on("error", err => {
      console.log("\n\t\tERROR: spawn failed! (" + err + ")");
    });
    child.on("message", (message: any) => {
      if (message.type === "DONE") {
        child.kill();

        store.dispatch({
          type: APPEND_LOGS,
          payload: {
            logSymbol: LogSymbols.success,
            label: `Deleted ${Dir_List?.length} ${
              Dir_List?.length > 1 ? "directories" : "directory"
            } successfully. `,
            value: "",
            id: "deleted_dir",
          },
        });

        setSuccessMessage(
          chalk.magentaBright(convertBytes(TOTAL_SIZE)) +
            " now free on your 💻",
        );
        setDone(true);
      }
    });
    return () => {
      if (!child.killed) child.kill();
    };
  }, []);

  if (done) {
    return (
      <Box paddingY={2} justifyContent="center">
        <Text>{successMessage}</Text>
      </Box>
    );
  }
  return (
    <Box>
      <Box paddingRight={1}>
        <Spinner />
      </Box>
      <Text>Deleting directories...</Text>
    </Box>
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
