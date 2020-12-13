const CHANGE_AGE_CAP = "CHANGE_AGE_CAP";
const UPDATE_DIRS_LIST = "UPDATE_DIRS";
const UPDATE_CONFIRMATION = "UPDATE_CONFIRMATION";

export { CHANGE_AGE_CAP, UPDATE_DIRS_LIST, UPDATE_CONFIRMATION };

const InitialState = { file_age: null, dir_list: null, confirmation: null };

export const R_Config = (
  state = InitialState,
  action: { payload: Object | any; type: String },
) => {
  let newState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case CHANGE_AGE_CAP:
      if (!isNaN(payload.file_age)) {
        newState.file_age = payload.file_age;
      }
      break;
    case UPDATE_DIRS_LIST:
      newState.dir_list = payload.dir_list;
      break;

    case UPDATE_CONFIRMATION:
      newState.confirmation = payload;
      break;
  }
  return newState;
};
