import Store from "@app/redux/index";

export const SelectFileAge = (store = Store.getState()) => {
  return store.config.file_age;
};
export const SelectLogs = (store = Store.getState()) => {
  return store.UI.logs;
};

export const SelectDirList = (store = Store.getState()) => {
  return store.config.dir_list;
};
export const SelectConfirmation = (store = Store.getState()) => {
  return store.config.confirmation;
};
