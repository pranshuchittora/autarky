import { combineReducers } from "redux";

import { R_Config } from "./ConfigReducer";
import { R_UI } from "./UIReducer";

const RootReducer = combineReducers({
  config: R_Config,
  UI: R_UI,
});

export default RootReducer;
