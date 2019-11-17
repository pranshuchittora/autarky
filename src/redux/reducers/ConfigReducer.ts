import { CHANGE_AGE_CAP, UPDATE_DIRS_LIST } from "../actionTypes";

const InitialState = { file_age: 0, dir_list: [] };
export function R_Config(
  state = InitialState,
  action: { payload: Object | any; type: String }
) {
  let newState = { ...state };
  const payload = action.payload;
  switch (action.type) {
    case CHANGE_AGE_CAP:
      newState.file_age = payload.file_age;
    case UPDATE_DIRS_LIST:
      newState.dir_list = payload.dir_list;
  }
  return newState;
}
