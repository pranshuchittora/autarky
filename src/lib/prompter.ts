import prompts from "prompts";
import * as chalk from "chalk";

import { CHANGE_AGE_CAP, UPDATE_DIRS_LIST } from "../redux/actionTypes";
import store from "../redux/index";
import { TimeRelative } from "./time";
import { promptListParser } from "./utils";
import { removeDirBulk } from "./removeDir";

export async function promptMultiSelectDir(ListDir: Object[]) {
  const parsedChoices = await promptListParser(ListDir);

  const response = await prompts({
    type: "multiselect",
    name: "value",
    message: "Select Directories",
    choices: parsedChoices,
    hint: "- Space to select. Return to submit"
  });

  store.dispatch({
    type: UPDATE_DIRS_LIST,
    payload: {
      dir_list: response.value
    }
  });
}

export async function promptAgeSelect() {
  const response = await prompts({
    type: "number",
    name: "age",
    // onCancel: cancelPrompt,

    message: "How old node_modules you wanna delete? (months)"
  });
  store.dispatch({ type: CHANGE_AGE_CAP, payload: { file_age: response.age } });
}

export async function promptDeleteConfirm() {
  const dirList = store.getState().config.dir_list;
  const count = Array.isArray(dirList) && dirList.length;
  const response = await prompts({
    type: "confirm",
    name: "confirmation",
    // onCancel: cancelPrompt,
    message: `Confirm deleteing ${count} directories ?`
  });
  // store.dispatch({ type: CHANGE_AGE_CAP, payload: { file_age: response.age } });
  if (response.confirmation === true) {
    removeDirBulk(dirList);
    process.stdout.write(
      chalk.green(`\nDeleted directories successfully 🎉\n\n`)
    );
  }
}
