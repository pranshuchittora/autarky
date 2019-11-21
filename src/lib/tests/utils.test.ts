// export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);
// test("basic", () => {
//   expect(sum()).toBe(0);
// });

// test("basic again", () => {
//   expect(sum(1, 2)).toBe(3);
// });

import { sortQueriesRefinedPath } from "../utils";

test("Sort path list based on age", () => {
  const UnsortedList = [
    {
      age: 200,
      path: "file1"
    },
    {
      age: 100,
      path: "file2"
    }
  ];
  expect(sortQueriesRefinedPath(UnsortedList)).toStrictEqual([
    {
      age: 100,
      path: "file2"
    },
    {
      age: 200,
      path: "file1"
    }
  ]);
});
