import React, { useState, useEffect, useCallback, useMemo } from "react";

import {
  AgeQuestion,
  DirSelect,
  ConfirmDeletion,
  RemoveDirs,
} from "@app/ui/containers/Interrogator/Questions";
import store from "@app/redux/index";
import {
  SelectConfirmation,
  SelectDirList,
  SelectFileAge,
  SelectLogs,
} from "@app/redux/selectors";

import LogMessage from "@app/ui/components/LogMessage";
import Table from "@app/ui/components/Table";

const Interrogator: React.FunctionComponent = () => {
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
        <Table data={SelectDirList(RStore)} />
        <ConfirmDeletion count={SelectDirList(RStore)?.length} />
      </>
    );
  } else {
    question = (
      <>
        <Table data={SelectDirList(RStore)} />
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

export default Interrogator;
