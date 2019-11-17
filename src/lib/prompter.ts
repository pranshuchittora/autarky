import prompts from "prompts";

import { promptListParser } from "./utils";
export async function promptMultiSelectDir(ListDir: Object[]) {
  const response = await prompts({
    type: "multiselect",
    name: "value",
    message: "Select Directories",
    choices: promptListParser(ListDir),

    hint: "- Space to select. Return to submit"
  });

  console.log(response.meaning);
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
