import { createStore } from "redux";

import RootReducer from "./reducers/index";

let store = createStore(RootReducer);

// store.subscribe(() =>
//   console.log("Store ->", JSON.stringify(store.getState(), null, 2))
// );

export default store;
