import { removeDirBulk } from "@app/lib/removeDir";

const RemoveDirectories = Resolved_Path_List => {
  removeDirBulk(Resolved_Path_List);
};

process.on("message", message => {
  switch (message.type) {
    case "START":
      const resp = RemoveDirectories(message.payload);
      process.send({ type: "DONE", payload: null });
      break;
  }
});
