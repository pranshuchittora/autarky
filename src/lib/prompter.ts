import prompts from "prompts";

import { CHANGE_AGE_CAP, UPDATE_DIRS_LIST } from "../redux/actionTypes";
import store from "../redux/index";
import { TimeRelative } from "./time";
import { promptListParser } from "./utils";
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
    message: "How old node_modules you wanna delete? (months)"
  });
  store.dispatch({ type: CHANGE_AGE_CAP, payload: { file_age: response.age } });
}
// const questions = [
//   {
//     type: "text",
//     name: "username",
//     message: "What is your GitHub username?"
//   },
//   {
//     type: "number",
//     name: "age",
//     message: "How old are you?"
//   },
//   {
//     type: "text",
//     name: "about",
//     message: "Tell something about yourself",
//     initial: "Why should I?"
//   }
// ];

// (async () => {
//   const onSubmit = (prompt, answer) =>
//     console.log(`Thanks I got ${answer} from ${prompt.name}`);
//   const response = await prompts(questions, { onSubmit });
//   const onCancel = prompt => {
//     console.log("Never stop prompting!");
//     return true;
//   };
// })();
