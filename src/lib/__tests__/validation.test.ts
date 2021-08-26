import { IntegerValidation } from "../validation";

describe("utils/IntegerValidation", () => {
  test("onChange", () => {
    const { onChange } = IntegerValidation;
    expect(onChange("ABCD1234EFG567")).toEqual("1234567");
    expect(onChange("ABCD1234EFG567")).not.toEqual("ABCD1234EFG567");
  });

  test("onDone", () => {
    const { onDone } = IntegerValidation;
    expect(onDone("1234567")).toEqual(1234567);
    expect(onDone("ABCD1234EFG567")).toEqual(NaN);
  });
});