import * as actionTypes from "../actionTypes";

describe("Action types", () => {
  test("Action types must be of type string", () => {
    Object.keys(actionTypes).forEach(key => {
      expect(typeof actionTypes[key]).toBe("string");
    });
  });
});
