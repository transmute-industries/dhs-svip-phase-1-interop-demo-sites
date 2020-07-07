import { handleActions } from "redux-actions";
import { setKeystoreProp } from "./actions";

import config from "../../config";

// TODO: UPDATE PLACEHOLDER
const initialState = {
  ...config
};

export default handleActions(
  {
    [setKeystoreProp]: (state, { payload }) => ({ ...state, ...payload })
  },
  initialState
);
