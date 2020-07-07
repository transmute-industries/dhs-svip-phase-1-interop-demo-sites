import { createAction } from "redux-actions";

export const setKeystoreProp = createAction(
  "keystore/SET_TMUI_PROP",
  payload => payload
);
