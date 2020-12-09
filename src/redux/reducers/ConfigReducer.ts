import { CHANGE_AGE_CAP, UPDATE_DIRS_LIST } from "../actionTypes";

const InitialState = { file_age: null, dir_list: [] };

export const R_Config = (
  state = InitialState,
  action: { payload: Object | any; type: String },
) => {
  let newState = { ...state };
  const payload = action.payload;
  switch (action.type) {
    case CHANGE_AGE_CAP:
      if (isNaN(payload.file_age) !== true) {
        newState.file_age = payload.file_age;
      }
    case UPDATE_DIRS_LIST:
      // console.log(FilterString(payload.dir_list));
      newState.dir_list = payload.dir_list;
  }
  return newState;
};
