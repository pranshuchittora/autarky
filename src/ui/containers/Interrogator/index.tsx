import React, { useState, useEffect, useCallback, useMemo } from "react";

import store from "@app/redux/index";

import Table from "@app/ui/components/Table";

import {
  AgeQuestion,
  DirSelect,
  ConfirmDeletion,
  RemoveDirs,
} from "@app/ui/containers/Interrogator/Questions";

import {
  SelectConfirmation,
  SelectDirList,
  SelectFileAge,
  SelectLogs,
} from "@app/redux/selectors";

import LogMessage from "@app/ui/components/LogMessage";
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

export default Interrogator;
