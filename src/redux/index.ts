import { createStore } from "redux";

import RootReducer from "./reducers/index";

let store = createStore(RootReducer);

// store.subscribe(() => console.log("Store ->", store.getState()));

export default store;
