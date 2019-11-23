import { CHANGE_AGE_CAP, UPDATE_DIRS_LIST } from "../actionTypes";
import store from "../index";

describe("Tests the Config Reducer - CHANGE_AGE_CAP", () => {
  test("Changes the AGE", () => {
    store.dispatch({ type: CHANGE_AGE_CAP, payload: { file_age: 5 } });
    expect(store.getState().config.file_age).toBe(5);
  });
  test("Invalid input to the AGE", () => {
    const PREV_VALUE = store.getState().config.file_age;
    store.dispatch({
      type: CHANGE_AGE_CAP,
      payload: { file_age: "SomeString" }
    });
    expect(store.getState().config.file_age).toBe(PREV_VALUE);
  });
});

describe("Tests the Config Reducer - UPDATE_DIRS_LIST", () => {
  const FILE_ARR: String[] = ["file1", "file2"];
  test("Changes the DIR_LIST", () => {
    store.dispatch({
      type: UPDATE_DIRS_LIST,
      payload: {
        dir_list: FILE_ARR
      }
    });
    expect(store.getState().config.dir_list).toBe(FILE_ARR);
  });
});
