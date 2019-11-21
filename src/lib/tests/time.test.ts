import { TimeRelative } from "../time";

test("Get realitive time string", () => {
  expect(TimeRelative(new Date())).toBe("a few seconds");
});
