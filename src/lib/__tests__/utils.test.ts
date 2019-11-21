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
