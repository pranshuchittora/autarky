import chalk from "chalk";
import * as inquirer from "inquirer";

import store from "../redux/index";
import { CHANGE_AGE_CAP, UPDATE_DIRS_LIST } from "../redux/actionTypes";
import { promptListParser } from "./utils";
import { removeDirBulk } from "./removeDir";

/**
 * Asks for the module age
 */
export async function promptAgeSelect() {
  const response = await inquirer.prompt([
    {
      type: "number",
      name: "age",
      message: "How old node_modules you wanna delete? (months)"
    }
  ]);

  store.dispatch({ type: CHANGE_AGE_CAP, payload: { file_age: response.age } });
}

/**
 * Multiselect for the diles to be deleted
 * @param ListDir
 */
export async function promptMultiSelectDir(ListDir: Object[]) {
  const parsedChoices = promptListParser(ListDir);

  const response = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Select directories to be deleted",
      name: "selectedDirs",
      pageSize: 20,
      choices: parsedChoices,
      validate: function(answer) {
        if (answer.length < 1) {
          return "You must choose at least one topping.";
        }

        return true;
      }
    }
  ]);

  store.dispatch({
    type: UPDATE_DIRS_LIST,
    payload: {
      dir_list: response.selectedDirs
    }
  });
}

export async function promptDeleteConfirm() {
  const dirList = store.getState().config.dir_list;
  const count = Array.isArray(dirList) && dirList.length;

  const response = await inquirer.prompt([
    {
      type: "confirm",
      message: `Confirm deleteing ${count} directories ?`,
      name: "confirmation"
    }
  ]);

  if (response.confirmation === true) {
    removeDirBulk(dirList);
    process.stdout.write(
      chalk.green(`\nDeleted ${count} directories successfully 🎉\n\n`)
    );
  } else {
    process.stdout.write(chalk.red(`\nBetter luck next time. 😔\n\n`));
  }
}
