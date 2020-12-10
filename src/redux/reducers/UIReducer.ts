const InitialState = {
  logs: [],
};

export const R_UI = (
  state = InitialState,
  action: { payload: Object | any; type: String },
) => {
  let newState = { ...state };

  const payload = action.payload;

  switch (action.type) {
    case APPEND_LOGS:
      newState.logs.push(payload);
      break;
  }
  return newState;
};

export const APPEND_LOGS = "UI/Append_Logs";
// const APPEND_LOGS = "UI/Append_Logs"
