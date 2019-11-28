import { combineReducers } from "redux";

import { R_Config } from "./ConfigReducer";
const RootReducer = combineReducers({
  config: R_Config,
});

export default RootReducer;
