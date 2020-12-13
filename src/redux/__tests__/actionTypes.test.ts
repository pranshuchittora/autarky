import {
  CHANGE_AGE_CAP,
  UPDATE_CONFIRMATION,
  UPDATE_DIRS_LIST,
} from "@app/redux/reducers/ConfigReducer";

const actionTypes = {
  CHANGE_AGE_CAP,
  UPDATE_CONFIRMATION,
  UPDATE_DIRS_LIST,
};

describe("Action types", () => {
  test("Action types must be of type string", () => {
    Object.keys(actionTypes).forEach(key => {
      expect(typeof actionTypes[key]).toBe("string");
    });
  });
});
