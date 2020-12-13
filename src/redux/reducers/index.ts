import { combineReducers } from "redux";

import { R_Config } from "@app/redux/reducers/ConfigReducer";
import { R_UI } from "@app/redux/reducers/UIReducer";

const RootReducer = combineReducers({
  config: R_Config,
  UI: R_UI,
});

export default RootReducer;
