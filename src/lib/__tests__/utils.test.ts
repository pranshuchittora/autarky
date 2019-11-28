import { sortQueriesRefinedPath, findTotalSize } from "../utils";

describe("Tests for utils - sortQueriesRefinedPath", () => {
  test("Sort path list based on file age", () => {
    const UnsortedList = [
      {
        age: 200,
        path: "file1",
      },
      {
        age: 100,
        path: "file2",
      },
    ];
    expect(sortQueriesRefinedPath(UnsortedList)).toStrictEqual([
      {
        age: 100,
        path: "file2",
      },
      {
        age: 200,
        path: "file1",
      },
    ]);
  });
});

describe("Find total size of all dirs", () => {
  test("Given an array of object ({size}), find the total size", () => {
    const SampleArr = [{ size: 1 }, { size: 2 }];
    const TOTAL_SIZE = findTotalSize(SampleArr);

    expect(TOTAL_SIZE).toBe(3);
  });
});
