import * as fs from "fs";
import { removeDir, removeDirBulk } from "../removeDir";

describe("Removes a single file", () => {
  test("Removes a file single.temp", () => {
    //Remove a file
    fs.writeFileSync("single.temp", null);
    removeDir("single.temp");
    const currentDirArr = fs.readdirSync("./");
    expect(currentDirArr.includes("single.temp")).toBe(false);
  });
});

describe("Removes files given an array of path", () => {
  test("Removes multiple files", () => {
    //Remove a file
    fs.writeFileSync("single1.temp", null);
    fs.writeFileSync("single2.temp", null);
    removeDirBulk(["single1.temp", "single2.temp"]);
    const currentDirArr = fs.readdirSync("./");
    expect(
      currentDirArr.includes("single1.temp") &&
        currentDirArr.includes("single2.temp")
    ).toBe(false);
  });
});
