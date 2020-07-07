import { handleActions } from "redux-actions";
import { setChapiProp } from "./actions";

// TODO: UPDATE PLACEHOLDER
const initialState = {
  wallet: {
    isLoaded: false,
    rows: [],
    object: {}
  }
};

export default handleActions(
  {
    [setChapiProp]: (state, { payload }) => ({ ...state, ...payload })
  },
  initialState
);
